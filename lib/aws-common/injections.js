'use strict';

const path = require('path');
const fs = require('fs');
const jsonWatch = require('../json-watch');

/**
 * Allows for injecting behavior before and after an API call.
 * Injections are associated with a service (e.g. SQS), an API
 * call (e.g. CreateQueue), and are given a specific registration name.
 *
 * Each registered injection is a local file that will be "required" into the
 * service.  This helps prevent simple remote attacks to inject behavior.
 *
 * Before calls are given the arguments (serviceName, apiName, request).  If
 * they are to return a value that overrides the default behavior, then it
 * should return a non-null value.  All the injections are invoked in the order
 * they were added.  The injections can all modify the request value as
 * necessary.  The returned value must conform to the return value used in the
 * `aws-common.routing` module.
 *
 * After calls are given the argumens (serviceName, apiName, request, response),
 * where the response is the return value given to the `aws-common.routing`
 * module.
 */

// Segmented as [service] [api name] (list of InjectionStore)
var injectBeforeStore = {};
var injectAfterStore = {};

// A reverse lookup to allow for module reloading.
// maps (path name) => list of InjectionStore.
var jsPathRegistration = {};

var dirsWatched = {};
var jsonWatched = {};

module.exports.addBefore = function(serviceName, apiName, injectionName, jsPath) {
  _addInjection(injectBeforeStore, serviceName,
    apiName, injectionName, jsPath, null, null);
};
module.exports.addAfter = function(serviceName, apiName, injectionName, jsPath) {
  _addInjection(injectAfterStore, serviceName,
    apiName, injectionName, jsPath, null, null);
};
module.exports.removeBefore = function(serviceName, apiName, injectionName) {
  return _removeInjection(injectBeforeStore, serviceName,
    apiName, injectionName);
};
module.exports.removeAfter = function(serviceName, apiName, injectionName) {
  return _removeInjection(injectAfterStore, serviceName,
    apiName, injectionName);
};
module.exports.clearBefore = function() {
  for (var p in injectBeforeStore) {
    if (injectBeforeStore.hasOwnProperty(p)) {
      delete injectBeforeStore[p];
    }
  }
};
module.exports.clearAfter = function() {
  for (var p in injectAfterStore) {
    if (injectAfterStore.hasOwnProperty(p)) {
      delete injectAfterStore[p];
    }
  }
};
module.exports.forEachBefore = function(f) {
  _forEachInjection(injectBeforeStore, f);
};
module.exports.forEachAfter = function(f) {
  _forEachInjection(injectAfterStore, f);
};
module.exports.getBeforeJSPath = function(serviceName, apiName, injectionName) {
  var injs = _getInjections(injectBeforeStore, serviceName, apiName);
  for (var i = 0; i < injs.length; i++) {
    if (injs[i].name == injectionName) {
      return injs[i].jsPath;
    }
  }
  return null;
};
module.exports.getAfterJSPath = function(serviceName, apiName, injectionName) {
  var injs = _getInjections(injectAfterStore, serviceName, apiName);
  for (var i = 0; i < injs.length; i++) {
    if (injs[i].name == injectionName) {
      return injs[i].jsPath;
    }
  }
  return null;
};

module.exports.invokeBeforeFor = function(serviceName, apiName, awsReq) {
  var res;
  var inj = _getInjections(injectBeforeStore, serviceName, apiName);
  for (var i = 0; i < inj.length; i++) {
    res = inj[i].callBefore(serviceName, apiName, awsReq);
    if (res !== null && res !== undefined) {
      return res;
    }
  }
  return null;
};

module.exports.invokeAfterFor = function(serviceName, apiName, awsReq, response) {
  var res;
  var inj = _getInjections(injectAfterStore, serviceName, apiName);
  for (var i = 0; i < inj.length; i++) {
    res = inj[i].callAfter(serviceName, apiName, awsReq, response);
    if (res !== null && res !== undefined) {
      // Allow other after injectors to run
      response = res;
    }
  }
  return response;
};

module.exports.monitorDirectory = function(dirname) {
  if (!!dirsWatched[dirname]) {
    return;
  }
  console.log('[Injections] Monitoring injection directory ' + dirname);
  var dirWatcher = jsonWatch.createJsonEmitter(dirname);
  dirWatcher
    .on('add', function(filepath) {
      module.exports.registerJsonFile(filepath);
    })
    .on('change', function(filepath) {
      module.exports.registerJsonFile(filepath);
    })
    .on('unlink', function(filepath) {
      module.exports.deregisterJsonFile(filepath);
    });
  dirsWatched[dirname] = dirWatcher;
};

module.exports.stopMonitoringDirectory = function(dirname) {
  if (!!dirsWatched[dirname]) {
    dirsWatched[dirname].close();
    delete dirsWatched[dirname];
  }
};

module.exports.registerJsonFile = function(filename) {
  module.exports.deregisterJsonFile(filename);
  var text = '';
  fs.createReadStream(filename)
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
      if (!!obj && !!obj.injections && obj.injections.length > 0) {
        jsonWatched[filename] = obj.injections;
        for (var i = 0; i < obj.injections.length; i++) {
          var service = obj.injections[i].service;
          var api = obj.injections[i].api;
          var name = obj.injections[i].name;
          var jsPath = obj.injections[i].path;
          var type = obj.injections[i].type;
          jsPath = path.join(path.dirname(filename), jsPath);
          if (type === 'Before') {
            module.exports.addBefore(service, api, name, jsPath);
          }
          if (type === 'After') {
            module.exports.addAfter(service, api, name, jsPath);
          }
        }
      }
    });
};

module.exports.deregisterJsonFile = function(filename) {
  if (!!jsonWatched[filename]) {
    for (var i = 0; i < jsonWatched[filename].length; i++) {
      var obj = jsonWatched[filename][i];
      var service = obj.service;
      var api = obj.api;
      var name = obj.name;
      var type = obj.type;
      if (type === 'Before') {
        module.exports.removeBefore(service, api, name);
      }
      if (type === 'After') {
        module.exports.removeAfter(service, api, name);
      }
    }
    delete jsonWatched[filename];
  }
};


function _addInjection(val, serviceName, apiName, injectionName, jsPath, moduleVal, emitter) {
  if (!val[serviceName]) {
    val[serviceName] = {};
  }
  if (!val[serviceName][apiName]) {
    val[serviceName][apiName] = [];
  }
  val[serviceName][apiName].push(new InjectionStore(
    injectionName, jsPath, moduleVal, emitter));
}


var _removeInjection = function(val, serviceName, apiName, injectionName) {
  var inj = _getInjections(val, serviceName, apiName);
  for (var i = 0; i < inj.length; i++) {
    if (inj[i].name === injectionName) {
      inj[i].close();
      inj.splice(i, 1);
      return true;
    }
  }
  return false;
};


var _getInjections = function(val, serviceName, apiName) {
  if (!!val[serviceName] && !!val[serviceName][apiName]) {
    return val[serviceName][apiName];
  }
  return [];
};


var _forEachInjection = function(val, f) {
  for (var serviceName in val) {
    if (injectBeforeStore.hasOwnProperty(serviceName)) {
      var services = val[serviceName];
      for (var apiName in services) {
        if (services.hasOwnProperty(apiName)) {
          var injs = services[apiName];
          for (var i = 0; i < injs.length; i++) {
            f(serviceName, apiName, injs[i][0], injs[i][2]);
          }
        }
      }
    }
  }
};


function InjectionStore(name, jsPath, moduleVal, emitter) {
  var t = this;
  this.name = name;
  this.jsPath = jsPath;
  if (!emitter) {
    var watch = jsonWatch.watchJsFile(jsPath);
    moduleVal = watch[0];
    emitter = watch[1];
  }
  emitter.on('update', function(filename, asModule) {
    t._setModule(asModule);
  });
  this._setModule(moduleVal);

  if (!jsPathRegistration[jsPath]) {
    jsPathRegistration[jsPath] = [];
  }
  jsPathRegistration[jsPath].push(this);
}
InjectionStore.prototype.callBefore = function(serviceName, apiName, awsReq) {
  if (!!this.func) {
    return this.func(serviceName, apiName, awsReq);
  }
  return null;
};
InjectionStore.prototype.callAfter = function(serviceName, apiName, awsReq, resp) {
  if (!!this.func) {
    return this.func(serviceName, apiName, awsReq, resp);
  }
  return null;
};
InjectionStore.prototype._setModule = function(asModule) {
  this.module = asModule;
  this.func = null;
  if (!!asModule) {
    if (!asModule[this.name] || typeof asModule[this.name] !== 'function') {
      console.log('*** INJECTION ERROR: ' + this.jsPath +
        ' has no callable function named ' + this.name);
    } else {
      this.func = asModule[this.name];
    }
  }
};
InjectionStore.prototype.close = function() {
  var isl = jsPathRegistration[this.jsPath];
  this.module = null;
  this.func = null;
  if (!!isl) {
    for (var i = 0; i < isl.length; i++) {
      if (isl[i] === this) {
        isl.splice(i, 1);
        return;
      }
    }
  }
};


// See if there is any "injection file" - a list of pre-determined
// set of injections to load by default.

module.exports.monitorDirectory(jsonWatch.jsonExtensionDir);
