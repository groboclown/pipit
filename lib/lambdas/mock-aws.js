'use strict';

/**
 * Construct a mock API around the actual aws-sdk.
 * Do this as dynamically as possible.
 */

const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
const util = require('util');
const apiRoutes = require('../../api/routes');
const localRouting = require('../aws-common/local-routing');

module.exports.config = AWS.config;

for (var k in AWS) {
  // This will ignore 'config'
  if ('A' >= k.charAt(0) && 'Z' <= k.charAt(0) &&
      AWS.hasOwnProperty(k)) {
    module.exports[k] = createAwsConstructor(k);
  }
}


/**
* Create a constructor for the corresponding AWS object.
*/
function createAwsConstructor(key) {
  var serviceName = key.toLowerCase();
  if (!apiVersions) {
    loadApiVersions();
  }
  if (!apiVersions[serviceName]) {
    console.log('[mock-aws] No AWS api for constructor ' + key);
    return null;
  }
  var apiVersionMap = apiVersions[serviceName];
  return function(config) {
    // Dynamic construction of the AWS object, depending upon which API is
    // selected.  This function is called as a "new".

    var version = config.apiVersion || AWS.config.apiVersion || 'latest';
    if (!apiVersionMap[version]) {
      // FIXME this should find the latest version _on or before_ `version`.
      throw new Error('unknown API version `' + version + '\' for ' + key);
    }

    var innerRouting = localRouting(apiRoutes['/' + serviceName]);

    // Bound parameters
    this.params = config.params || {};

    // Create bound functions
    var apiVersion = apiVersionMap[version];
    for (var operationName in apiVersion.operations) {
      if (apiVersion.operations.hasOwnProperty(operationName)) {
        bindAwsServiceCall(innerRouting, serviceName, this, operationName);
      }
    }
  };
}


function bindAwsServiceCall(innerRouting, serviceName, obj, operation) {
  if (!innerRouting[operation]) {
    throw new Error('[' + serviceName + '] API mismatch between aws-sdk and mock api for ' + operation);
  }
  var apiCall = function() {
    var params = {};
    // Setup the arguments
    var callback = null;
    switch (arguments.length) {
      case 0: {
        // No parameters, return a Response object.
        break;
      }
      case 1: {
        if (typeof arguments[0] === 'function') {
          // Callback
          callback = arguments[0];
        } else {
          // Parameters, return a Response object
          params = arguments[0];
        }
        break;
      }
      case 2: {
        // Parameters, callback
        params = arguments[0];
        callback = arguments[1];
        break;
      }
      default: {
        throw new Error('[' + serviceName + '] At most 2 arguments for any API call.');
      }
    }
    // Copy the bound parameters.
    for (var p in obj.params) {
      if (obj.params.hasOwnProperty(p) && !params[p]) {
        params[p] = obj.params[p];
      }
    }

    if (callback === null) {
      // Return a custom response object that will use a custom callback.
      return new MockResponse(innerRouting[operation], params);
    }
    innerRouting[operation](params, callback);
  };
  var funcName = operation.charAt(0).toLowerCase() + operation.substr(1);
  obj[funcName] = apiCall.bind(obj);
}

function MockResponse(routingCall, params) {
  EventEmitter.call(this);
  this.data = null;
  this.error = null;
  this.requestId = null;
  this.retryCount = 0;
  this.redirectCount = 0;
  this.httpResponse = null;
  this._params = params;
  this._routingCall = routingCall;
}
util.inherits(MockResponse, EventEmitter);
MockResponse.prototype.send = function send() {
  this._routingCall(this._params, this._routingCallback);
};
MockResponse.prototype._routingCallback = function _routingCallback(error, data) {
  if (!!error) {
    this.error = error;
    this.emit('error', error);
  } else {
    this.data = data;
    this.emit('success', data);
  }
};
MockResponse.prototype.hasNextPage = function hasNextPage() {
  // No paging handles
  return false;
};
MockResponse.prototype.nextPage = function nextPage() {
  // Make a mock event emitter that doesn't do anything,
  // because we don't handle pages
  return {
    on: function(e, f) {},
    send: function() {
      throw new Error('no additional pages');
    },
  };
};


var apiVersions = null;
function loadApiVersions() {
  apiVersions = {};
  var apiDir = path.resolve(path.join(__dirname, '../../node_modules/aws-sdk/apis'));
  console.log('[mock-aws] Reading mock AWS APIs from ' + apiDir);
  var files = fs.readdirSync(apiDir);
  for (var i = 0; i < files.length; i++) {
    // Ignore the paginators file
    if (files[i].endsWith('.min.json')) {
      var apiVersion = loadApiVersionFile(path.join(apiDir, files[i]));
      if (apiVersion) {
        if (!apiVersions[apiVersion.service]) {
          apiVersions[apiVersion.service] = {};
        }
        apiVersions[apiVersion.service][apiVersion.version] = apiVersion;
        if (!apiVersions[apiVersion.service].latestVersion ||
              (apiVersion.version > apiVersions[apiVersion.service].latestVersion)) {
          apiVersions[apiVersion.service].latestVersion = apiVersion.version;
          apiVersions[apiVersion.service].latest = apiVersion;
        }
      }
    }
  }
}

function loadApiVersionFile(filepath) {
  console.log('[mock-aws] Reading api ' + filepath);
  try {
    var apiJson = require(filepath);
    if (apiJson.version !== '2.0') {
      console.log('not API version 2.0');
      return null;
    }
    return {
      service: apiJson.metadata.endpointPrefix.toLowerCase(),
      version: apiJson.metadata.apiVersion,
      operations: apiJson.operations,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
}
