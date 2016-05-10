'use strict';

const Q = require('q');
const s3 = require('../s3');
const fs = require('fs');
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
  var version = p.version || '$LATEST';
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
  var vpcConfig = p.vpcConfig;

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
      awsRequest.accessKey + ':function:' + this.FunctionName + ':' + this.Version;
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
      throw ['InternalError', 'code is not a file: ' + localCodePath];
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
  };
};




/**
* @return a promise that completes with the exit payload.
*/
Lambda.prototype.invoke = function invoke(p) {
  var event = p.event || null;
  var clientContext = p.clientContext || null;
  var awsRequestId = p.awsRequestId || null;
  var cognitoIdentity = p.cognitoIdentity || null;
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
    Q.spread([event, context], handler)
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
