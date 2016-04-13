'use strict';

/**
 * Common API for the AWS emulation to find and run callback lambdas.
 */

const textParse = require('../test-parse');
const fs = require('fs');
const Q = require('q');
const crypto = require('crypto');
const yauzl = require('yauzl');
const mkdirp = require('mkdirp');
const path = require('path');
const vm = require('vm');
const jsonWatch = require('../json-watch');
const s3 = require('../s3');


// Maps lambda function name -> list of versioned Lambda objects
var lambdaDepot = {};

var eventSourceMappings = {};

/**
 * For now, codeFileLocation refers to the s3 path.
 */
function Lambda({ functionName, description,
      role, codeFileLocation, memorySize, publish, runtime, handler, timeout,
      awsRequest, promiseLatch, enabled, }) {
  var t = this;
  var now = new Date();
  this.Description = description;
  this.Role = role;
  this.MemorySize = textParse.parseInteger(memorySize);
  this.LastModified =
      now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
  this.Enabled = textParse.parseBoolean(enabled, true); // Boolean, defaults to true
  this.Timeout = textParse.parseInteger(timeout);
  this.Handler = handler;
  this.FunctionName = functionName;
  this.Published = textParse.parseBoolean(publish, false);

  // This can also include the version number, or 'latest'
  this.FunctionArn = 'arn:aws:lambda:' + awsRequest.region + ':' +
      awsRequest.accessKey + ':function:' + this.FunctionName;
  this.Version = '1';
  this.Runtime = runtime;

  // These will be populated in the 'then' part of the
  // promise latch.
  this.CodeSize = 0; /*Long*/
  this.CodeSha256 = '';
  this.unzipLocation = null;
  this.S3CodePath = codeFileLocation;
  var localCodePath = s3.toLocalPath(codeFileLocation);

  promiseLatch.then(function t1() {
    // Read the file stats for the code file location.
    return Q.nfcall(fs.stat, localCodePath);
  }).then(function t2(stats) {
    // Load the file stats into the lambda object.
    if (!stats.isFile()) {
      throw new Error('code is not a file: ' + localCodePath);
    }
    t.CodeSize = stats.size;

    // Read in the file contents to compute the hash
    var hash = crypto.createHash('sha256');
    var deferred = Q.defer();
    hash.on('readable', function() {
      var data = hash.read();
      if (data) {
        deferred.resolve(data.toString('hex'));
      }
    });
    hash.on('error', function(err) {
      deferred.reject(err);
    });

    // Pipe all the data together.
    fs.createReadStream(localCodePath).pipe(hash);

    return deferred.promise;
  }).then(function t3(hashValue) {
    // Set the hash value

    t.CodeSha256 = hashValue;

    return s3.unzip(codeFileLocation);
  }).then(function t4(unzipLocation) {
    t.unzipLocation = unzipLocation;
  });
}
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
  };
};
/**
* @return a promise that completes with the exit payload.
*/
Lambda.prototype.invoke = function invoke(args) {
  var t = this;
  var mocks = { 'aws-sdk': require('./mock-aws') };
  var moduleContext = loadModule(this.unzipLocation, mocks);
  var ret = Q.defer();
  if (!moduleContext[this.Handler]) {
    ret.reject(new Error('Invalid handler for lambda ' +
      this.S3CodePath + ': ' + this.Handler));
  } else {
    var handler = moduleContext[this.Handler];
    var context = {
      succeed: function(result) {
        ret.resolve(result);
      },
      fail: function(err) {
        ret.reject(err);
      },
      done: function(err, message) {
        if (!err) {
          ret.reject(err);
        } else {
          ret.resolve(message);
        }
      },
      getRemainingTimeInMillis: function() {
        // TODO implement correctly
        return 10;
      },
      functionName: t.FunctionName,
      functionVersion: t.FunctionVersion,

      // Mobile sdk info
      identity: null,
      clientContext: null,
    };
    Q.spread([args, context], handler)
      .then(function t1() {
        console.log('Lambda ' + t.FunctionName + ' completed successfully');
      })
      .fail(function f1(err) {
        console.error(err);
        ret.reject(err);
      });
  }

  return ret.promise;
};


module.exports.hasLambda = function hasLambda(name) {
  return (!!lambdaDepot[name] && lambdaDepot[name].length > 0);
};

module.exports.getByArn = function getByArn(arn) {
  // FIXME
};


module.exports.addLambda = function addLambda({ functionName, description,
      role, codeFileLocation, memorySize, publish, runtime, handler, timeout,
      awsRequest, enabled, }) {
  // FIXME params is not defined
  if (module.exports.hasLambda(functionName)) {
    return Q([400, 'Sender', 'ResourceConflictException', 'Lambda already exists: ' + functionName]);
  }
  if (runtime !== 'nodejs') {
    return Q([400, 'Sender', 'InvalidParameterValueException', 'Invalid lambda runtime ' + runtime]);
  }
  // The default value is 128 MB.  The value must be a multiple of 64 MB.
  // Minimum value of 128. Maximum value of 1536.
  if (!memorySize) {
    // Default memory size
    memorySize = 128;
  } else if (memorySize < 128 || memorySize > 1536 || memorySize % 64 !== 0) {
    return Q([400, 'Sender', 'InvalidParameterValueException', 'Invalid memory size ' + memorySize]);
  }

  var promiseLatch = Q(null);
  var lambda = new Lambda({
    functionName: functionName,
    description: description,
    role: role,
    codeFileLocation: codeFileLocation,
    memorySize: memorySize,
    publish: publish,
    runtime: runtime,
    handler: handler,
    timeout: timeout,
    awsRequest: awsRequest,
    promiseLatch: promiseLatch,
  });
  promiseLatch.then(function() {
    if (!lambdaDepot[functionName]) {
      lambdaDepot[functionName] = [];
    }
    lambdaDepot[functionName].push(lambda);
    return [200, lambda.describe()];
  });
  return promiseLatch;
};

module.exports.removeLambda = function removeLambda(lambdaName, version) {
  // TODO implement
};



module.exports.loadLambdasFromJson = function loadLambdasFromJson(jsonFile) {
  var text = '';
  fs.createReadStream(jsonFile)
    .on('data', function(chunk) {
      text += chunk;
    })
    .on('end', function() {
      var obj = null;
      try {
        obj = JSON.parse(text);
      } catch (e) {
        // Ignore
        obj = null;
      }
      if (!!obj && !!obj.lambdas && obj.lambdas.length > 0) {
        jsonWatched[jsonFile] = obj.lambdas;
        for (var i = 0; i < obj.lambdas.length; i++) {
          var name = obj.lambdas[i].name;
          var handler = obj.lambdas[i].handler;
          var description = obj.lambdas[i].description || '';
          var role = obj.lambdas[i].role || '';
          var codeFileLocation = obj.lambdas[i].codeFileLocation || '';
          var memorySize = obj.lamdas[i].memorySize || 0;
          var publish = obj.lambdas[i].publish || false;
          var runtime = 'nodejs';
          var timeout = obj.lambdas[i].timeout || 300;
          module.exports.addLambda(name, description,
            role, codeFileLocation, memorySize, publish, runtime,
            handler, timeout, {
              region: (obj.lambdas[i].region || 'XY-MOCK-1'),
            });
        }
      }
    });
};

module.exports.removeLambdasForJsonFile = function removeLambdasForJsonFile(jsonFile) {
  if (!!jsonWatched[jsonFile]) {
    for (var i = 0; i < jsonWatched.length; i++) {
      module.exports.removeLambda(jsonWatched[i].name);
    }
  }
};
var jsonWatched = {};


module.exports.monitorDir = function monitorDir(dirname) {
  if (!!watchedDirs[dirname]) {
    return;
  }
  var dirWatcher = jsonWatch.createJsonEmitter(dirname);
  dirWatcher
    .on('add', function o1(filepath) {
      module.exports.loadLambdasFromJson(filepath);
    })
    .on('change', function o2(filepath) {
      module.exports.loadLambdasFromJson(filepath);
    })
    .on('unlink', function o3(filepath) {
      module.exports.removeLambdasForJsonFile(filepath);
    });
  watchedDirs[dirname] = dirWatcher;
};

var watchedDirs = {};


// FIXME running a lambda will require passing in the source AWS object.
// This will be used to construct the aws object that is passed to the
// service.

// FIXME add a listener for auto-registered lambdas.
module.exports.monitorDir(jsonWatch.jsonExtensionDir);


/**
* Helper for unit testing:
* - load module with mocked dependencies
* - allow accessing private state of the module
*
* @param {string} filePath Absolute path to module (file to load)
* @param {Object=} mocks Hash of mocked dependencies
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

  // FIXME "vm" is not a variable
  vm.runInNewContext(fs.readFileSync(filePath), context);
  return context;
};
