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

for (var k in AWS) {
  if (AWS.hasOwnProperty(k)) {
    // ` console.log('[mock-aws] adding AWS constructor for ' + k);
    module.exports[k] = createAwsConstructor(k);
  }
}
// Set our own configuration
module.exports.config = new AWS.Config();

/**
* Create a constructor for the corresponding AWS object.
*/
function createAwsConstructor(key) {
  var serviceName = key.toLowerCase();
  var routeUrl = '/' + serviceName;
  var routeMap = apiRoutes[routeUrl];
  if (!routeMap) {
    // Note: this is kind of screwy, because we don't capture the relationship
    // between the service name and the URL.
    if (typeof AWS[key] !== 'function') {
      // This is fine - we just copy it from the AWS object.
      // This is things like the config, or the version.
      console.log(`[mock-aws] Copying from AWS: ${key}`);
      return AWS[key];
    }
    // Service name could be registered by version.
    for (var k in apiRoutes) {
      if (apiRoutes.hasOwnProperty(k)) {
        if (k.startsWith('/' + serviceName + '/')) {
          // This is the one
          routeMap = apiRoutes[k];
          routeUrl = k;
          break;
        }
      }
    }
    if (!routeMap) {
      console.log(`[mock-aws] Not mocking AWS service or function '${key}'`);
      return AWS[key];
    }
  }

  // Create constructor!
  return function(config) {
    // Dynamic construction of the AWS object, depending upon which API is
    // selected.  This function is called as a "new".

    this.config = config || AWS.config;
    this.version = this.config.apiVersion || AWS.config.apiVersion || 'latest';
    var innerRoutingList = localRouting({
      serviceName: key,
      url: routeUrl,
      actionMap: routeMap,
    });

    // Bound parameters
    this.params = this.config.params || AWS.config.params || {};

    // Create bound functions
    for (var i = 0; i < innerRoutingList.length; i++) {
      bindAwsServiceCall(serviceName, this, innerRoutingList[i].actionName, innerRoutingList[i].handler);
    }
  };
}


function bindAwsServiceCall(serviceName, obj, actionName, actionHandler) {
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
      return new MockResponse(this.config, actionHandler, params);
    }
    actionHandler(this.config, params, callback);
  };
  var funcName = actionName.charAt(0).toLowerCase() + actionName.substr(1);
  obj[funcName] = apiCall.bind(obj);
}


function MockResponse(awsConfig, routingCall, params) {
  EventEmitter.call(this);
  this.data = null;
  this.error = null;
  this.requestId = null;
  this.retryCount = 0;
  this.redirectCount = 0;
  this.httpResponse = null;
  this._params = params;
  this._routingCall = routingCall;
  this._awsConfig = awsConfig;
}
util.inherits(MockResponse, EventEmitter);
MockResponse.prototype.send = function send() {
  this._routingCall(this._awsConfig, this._params, this._routingCallback);
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

// FIXME pages should be handled, because the URL call handles pages.
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
