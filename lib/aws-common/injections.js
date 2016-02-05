'use strict';

/**
 * Allows for injecting behavior before and after an API call.
 * Injections are associated with a service (e.g. SQS), an API
 * call (e.g. CreateQueue), and are given a specific registration name.
 *
 * Each registered injection is a local file that will be "required" into the
 * service.  This helps prevent simple remote attacks to inject behavior.
 *
 * Before calls are given the arguments (serviceName, apiName, request).  If
 * they are to return a value that overrides the default behavior, then it should
 * return a non-null value.  All the injections are invoked in the order they
 * were added.  The injections can all modify the request value as necessary.
 * The returned value must conform to the return value used in the
 * `aws-common.routing` module.
 *
 * After calls are given the argumens (serviceName, apiName, request, response),
 * where the response is the return value given to the `aws-common.routing`
 * module.
 */

// segmented as [service] [api name] (list of [name of injection, injection obj, injection path])
var injectBeforeStore = {};
var injectAfterStore = {};

var injections = {
    addBefore: function(serviceName, apiName, injectionName, jsPath) {
        _addInjection(injectBeforeStore, serviceName, apiName, injectionName, jsPath);
    },
    addAfter: function(serviceName, apiName, injectionName, jsPath) {
        _addInjection(injectAfterStore, serviceName, apiName, injectionName, jsPath);
    },
    removeBefore: function(serviceName, apiName, injectionName) {
        return _removeInjection(injectBeforeStore, serviceName, apiName, injectionName);
    },
    removeAfter: function(serviceName, apiName, injectionName) {
        return _removeInjection(injectAfterStore, serviceName, apiName, injectionName);
    },
    clearBefore: function() {
        for (var p in injectBeforeStore) {
            if (injectBeforeStore.hasOwnProperty(p)) {
                delete injectBeforeStore[p];
            }
        }
    },
    clearAfter: function() {
        for (var p in injectAfterStore) {
            if (injectAfterStore.hasOwnProperty(p)) {
                delete injectAfterStore[p];
            }
        }
    },
    forEachBefore: function(f) {
        _forEachInjection(injectBeforeStore, f);
    },
    forEachAfter: function(f) {
        _forEachInjection(injectAfterStore, f);
    },
    getBeforeJSPath: function(serviceName, apiName, injectionName) {
        var injs = _getInjections(injectBeforeStore, serviceName, apiName);
        for (var i = 0; i < injs.length; i++) {
            if (injs[i][0] == injectionName) {
                return injs[i][2];
            }
        }
        return null;
    },
    getAfterJSPath: function(serviceName, apiName, injectionName) {
        var injs = _getInjections(injectAfterStore, serviceName, apiName);
        for (var i = 0; i < injs.length; i++) {
            if (injs[i][0] == injectionName) {
                return injs[i][2];
            }
        }
        return null;
    },

    invokeBeforeFor: function(serviceName, apiName, req) {
        var res;
        var inj = _getInjections(injectBeforeStore, serviceName, apiName);
        for (var i = 0; i < inj.length; i++) {
            res = inj[i][1][inj[i][0]](serviceName, apiName, req);
            if (res !== null && res !== undefined) {
                return res;
            }
        }
        return null;
    },

    invokeAfterFor: function(serviceName, apiName, req, response) {
        var res;
        var inj = _getInjections(injectAfterStore, serviceName, apiName);
        for (var i = 0; i < inj.length; i++) {
            res = inj[i][1][inj[i][0]](serviceName, apiName, req, response);
            if (res !== null && res !== undefined) {
                // allow other after injectors to run
                response = res;
            }
        }
        return response;
    }
};


var _addInjection = function(val, serviceName, apiName, injectionName, jsPath) {
    var injection = require(jsPath);
    if (! injection || ! injection[injectionName]) {
        throw new Exception("unknown key `" + injectionName + "' in " + jsPath);
    }
    if (! val[serviceName]) {
        val[serviceName] = {};
    }
    if (! val[serviceName][apiName]) {
        val[serviceName][apiName] = [];
    }
    val[serviceName][apiName].push([injectionName, injection, jsPath]);
};


var _removeInjection = function(val, serviceName, apiName, injectionName) {
    var inj = _getInjections(val, serviceName, apiName);
    for (var i = 0; i < inj.length; i++) {
        if (inj[i][0] === injectionName) {
            inj.splice(i, 1);
            return true;
        }
    }
    return false;
};


var _getInjections = function(val, serviceName, apiName) {
    if (!! val[serviceName] && !! val[serviceName][apiName]) {
        return val[serviceName][apiName];
    }
    return [];
};


var _forEachInjection = function(val, f) {
    for (var serviceName in val) {
        if (injectBeforeStore.hasOwnProperty(serviceName)) {
            var services = val[serviceName]
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


// TODO see if there is any "injection file" - a list of pre-determined
// set of injections to load by default.


module.exports = injections;
