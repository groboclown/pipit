'use strict';

const Q = require('q');
const fs = require('fs');
const vm = require('vm');
const crypto = require('crypto');
const path = require('path');
const s3 = require('../s3');
const textParse = require('../test-parse');

/**
 * @return {Q} promise that returns the created lambda.
 */
module.exports = function createLambda(p) {
  var q = Q.defer();
  p.promiseLatch = q.promise;
  try {
    var lambda = new Lambda(p);
    q.resolve(lambda);
  } catch (err) {
    q.reject(err);
  }
  return q.promise;
};


/**
 * For now, codeFileLocation refers to the s3 path.
 */
function Lambda(p) {
  var functionName = p.functionName;
  var version = p.version;
  var description = p.description;
  var role = p.role;
  var codeFileLocation = p.codeFileLocation;
  var memorySize = p.memorySize;
  var publish = p.publish;
  var runtime = p.runtime;
  var handler = p.handler;
  var timeout = p.timeout;
  var awsRequest = p.awsRequest;
  var promiseLatch = p.promiseLatch;
  var enabled = p.enabled;
  var vpcConfig = p.vpcConfig || null;

  var t = this;
  var now = new Date();
  this.Description = description;
  this.Role = role;
  this.MemorySize = textParse.parseInteger(memorySize, 128);
  this.LastModified =
      now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
  this.Enabled = textParse.parseBoolean(enabled, true); // Boolean, defaults to true
  this.Timeout = textParse.parseInteger(timeout, 300);
  this.Handler = handler;
  this.FunctionName = functionName;
  this.Verision = version;
  this.Published = textParse.parseBoolean(publish, false);

  // This can also include the version number, or 'latest'
  this.FunctionArn = 'arn:aws:lambda:' + awsRequest.region + ':' +
      awsRequest.accessKey + ':function:' + this.FunctionName;
  this.Runtime = runtime;
  this.VpcConfig = !vpcConfig ? null : {
    SecurityGroupIds: vpcConfig.SecurityGroupIds || null,
    VpcId: vpcConfig.VpcId || null,
    SubnetIds: vpcConfig.SubnetIds || null,
  };

  // These will be populated in the 'then' part of the
  // promise latch.
  this.CodeSize = 0; /*Long*/
  this.CodeSha256 = '';
  this.unzipLocation = null;
  this.S3CodePath = codeFileLocation;
  var localCodePath = s3.toLocalPath(codeFileLocation);


  // Suppose the handler is saved in the file `helloworld.js`, and the
  // handler function is `module.exports.myHandler = function ...`,
  // then the Handler for the lambda, as passed in, is named
  // `helloworld.myHandler`.
  if (this.Handler.indexOf('.') < 0) {
    // No explicit name.  Use default of "index.js"
    this.moduleFilePath = 'index';
    this.functionHandler = this.Handler;
  } else {
    var pos = this.Handler.lastIndexOf('.');
    this.functionHandler = this.Handler.substr(pos + 1);
    this.moduleFilePath = this.Handler.substr(0, pos).replace('.', path.sep);
  }

  promiseLatch.then(function t1() {
    // Read the file stats for the code file location.
    console.log(`[LAMBDA ${t.FunctionName}] loading file location of ${localCodePath}`);
    return Q.nfcall(fs.stat, localCodePath);
  }).then(function t2(stats) {
    // Load the file stats into the lambda object.
    if (!stats.isFile()) {
      throw ['InternalError', 'code is not a file: ' + localCodePath];
    }
    t.CodeSize = stats.size;

    // Read in the file contents to compute the hash
    console.log(`[LAMBDA ${t.FunctionName}] capturing hash of ${localCodePath}`);
    try {
      var hash = crypto.createHash('sha256');
      var deferred = Q.defer();
      hash.on('readable', function() {
        var data = hash.read();
        if (data) {
          console.log(`[LAMBDA ${t.FunctionName}] resolved the hash of the file`);
          deferred.resolve(data.toString('hex'));
        }
      });
      hash.on('error', function(err) {
        console.log(`[LAMBDA ${t.FunctionName}] error while reading hash`);
        deferred.reject(err);
      });

      // Pipe all the data together.
      fs.createReadStream(localCodePath).pipe(hash);
    } catch (e) {
      console.log(`[LAMBDA ${t.FunctionName}] hash setup failed with ${e.message}\n${e.stack}`);
      deferred.reject(e);
    }

    console.log(`[LAMBDA ${t.FunctionName}] returning promise for hash capture`);
    return deferred.promise;
  }).then(function t3(hashValue) {
    // Set the hash value
    console.log(`[LAMBDA ${t.FunctionName}] hash of ${localCodePath} is ${hashValue}`);

    t.CodeSha256 = hashValue;

    // Q seems to have some trouble if this causes an exception.
    try {
      return s3.unzip(codeFileLocation);
    } catch (e) {
      console.log(`[LAMBDA ${t.FunctionName}] unzip failed with ${e.message}\n${e.stack}`);
      throw e;
    }
  }).then(function t4(unzipLocation) {
    console.log(`[LAMBDA ${t.FunctionName}] unzipped to ${unzipLocation}`);
    t.unzipLocation = unzipLocation;

    // Now, find the actual file that stores the function.
    var deferred = Q.defer();
    var moduleFileLocation = path.join(unzipLocation, t.moduleFilePath) + '.js';
    fs.stat(moduleFileLocation, function(err, stat) {
      if (!err && stat.isFile()) {
        deferred.resolve(moduleFileLocation);
      }
      // Try index.js
      moduleFileLocation = path.join(unzipLocation, t.moduleFilePath, 'index.js');
      fs.stat(moduleFileLocation, function(err, stat) {
        if (err) {
          return deferred.reject(err);
        }
        if (!stat.isFile()) {
          return deferred.reject(new Error(`not a module location: ${path.join(unzipLocation, t.moduleFilePath)}`));
        }
        return deferred.resolve(moduleFileLocation);
      });
    });
    return deferred.promise;
  }).then(function t5(moduleFileLocation) {
    console.log(`[LAMBDA ${t.FunctionName}] module file at to ${moduleFileLocation}`);
    t.moduleFileLocation = moduleFileLocation;
    return t;
  });
}


Lambda.prototype.findProblems = function findProblems() {
  if (!this.Runtime.startsWith('nodejs')) {
    return ['InvalidParameterValueException', 'Invalid lambda runtime ' + this.Runtime];
  }
  // The default value is 128 MB.  The value must be a multiple of 64 MB.
  // Minimum value of 128. Maximum value of 1536.
  if (this.MemorySize < 128 || this.MemorySize > 1536 || this.MemorySize % 64 !== 0) {
    return ['InvalidParameterValueException', 'Invalid memory size ' + this.MemorySize];
  }
  return null;
};


Lambda.prototype.describe = function describe() {
  return {
    CodeSha256: this.CodeSha256,
    CodeSize: this.CodeSize,
    Description: this.Description,
    FunctionArn: this.FunctionArn,
    FunctionName: this.FunctionName,
    Handler: this.Handler,
    LastModified: this.LastModified,
    MemorySize: this.MemorySize,
    Role: this.Role,
    Runtime: this.Runtime,
    Timeout: this.Timeout,
    Version: this.Version,
    VpcConfig: this.VpcConfig,
  };
};




/**
 * Does not perform time-outs.  That's up to the caller.
 *
 * @return {Q} a promise that completes with the exit payload.
 */
Lambda.prototype.invoke = function invoke(p) {
  var event = p.event || null;
  var clientContext = p.clientContext || null;
  var awsRequestId = p.awsRequestId || null;
  var cognitoIdentity = p.cognitoIdentity || null;
  var t = this;
  var mocks = { 'aws-sdk': require('./mock-aws') };

  return loadModule(this.moduleFileLocation, mocks)
  .then(function(moduleContext) {
    var handler = moduleContext.module.exports[t.functionHandler];
    if (!handler) {
      console.log(`[LAMBDA ${t.FunctionName}] could not find handler [${t.functionHandler}] in file [${t.moduleFileLocation}]; obj is ${JSON.stringify(moduleContext)}`);
      throw new Error(`Invalid handler for lambda ${t.S3CodePath}: ${t.Handler}`);
    }
    var ret = Q.defer();
    var context = {
      succeed: function(result) {
        console.log(`[LAMBDA ${t.FunctionName}] succeeded with (${result})`);
        ret.resolve(result);
      },
      fail: function(err) {
        console.log(`[LAMBDA ${t.FunctionName}] failed with (${err})`);
        ret.reject(err);
      },
      done: function(err, message) {
        if (!!err) {
          console.log(`[LAMBDA ${t.FunctionName}] failed with (${err})`);
          ret.reject(err);
        } else {
          console.log(`[LAMBDA ${t.FunctionName}] succeeded with (${message})`);
          ret.resolve(message);
        }
      },
      getRemainingTimeInMillis: function() {
        // TODO implement correctly
        return 10;
      },
      functionName: t.FunctionName,
      functionVersion: t.FunctionVersion,
      invokedFunctionArn: t.FunctionArn,
      memoryLimitInMB: t.MemorySize,
      awsRequestId: awsRequestId,
      logGroupName: 'log group', // TODO implement correctly
      logStreamName: 'long stream', // TODO implement correctly

      // Cognito user information
      identity: cognitoIdentity,

      // Mobile context
      clientContext: clientContext,
    };
    try {
      var returnResult = handler(event, context);
      console.log(`[LAMBDA ${t.FunctionName}] returned with ${returnResult}`);
      // Should not resolve; because the lambda could have background stuff
      // running.
    } catch (e) {
      console.error(`[LAMBDA ${t.FunctionName}] failed with: ${e.message}\n${e.stack}`);
      ret.reject(e);
    }
    return ret.promise;
  });
};


/**
* Helper for unit testing:
* - load module with mocked dependencies
* - allow accessing private state of the module
*
* @param {string} filePath Absolute path to module (file to load)
* @param {Object=} mocks Hash of mocked dependencies
* @return {Q} the promise that contains the context.
*/
var loadModule = function(filePath, mocks) {
  mocks = mocks || {};

  // This is necessary to allow relative path modules within loaded file
  // i.e. requiring ./some inside file /a/b.js needs to be resolved to /a/some
  var resolveModule = function(module) {
    if (module.charAt(0) !== '.') {
      return module;
    }
    return path.resolve(path.dirname(filePath), module);
  };

  var exports = {};
  var context = {
    require: function(name) {
      return mocks[name] || require(resolveModule(name));
    },
    console: console,
    exports: exports,
    module: { exports: exports },
  };

  console.log(`[LOAD MODULE] loading file ${filePath}`);
  var ret = Q.defer();
  fs.readFile(filePath, function(err, data) {
    if (err) {
      return ret.reject(err);
    }
    ret.resolve(data);
  });
  return ret.promise.then(function(data) {
    vm.runInNewContext(data.toString(), context);
    // ` console.log(`[LOAD MODULE] read context keys ${Object.keys(context.module.exports)}`);
    return context;
  });
};
