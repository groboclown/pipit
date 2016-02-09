'use strict';

var xml2js = require('xml2js');
var uuid = require('uuid');
var crypto = require('crypto');
var express = require('express');
var routing = require('./routing');
var normalizeRoute = require('./normalize-route');

module.exports.gen_request_id = function() {
    return uuid.v4();
};
module.exports.gen_arn = function(aws) {
    var path = '';
    for (var i = 1; i < arguments.length; i++) {
        path += ':' + arguments[i];
    }
    return "arn:aws:" + aws.serviceName + ":" + aws.region + path;
};

/** current epoch time in seconds */
module.exports.timestamp = function() {
    return Date.now() / 1000 | 0;
};
/** md5 hash hex string of a string */
module.exports.md5 = function(data) {
    return crypto.createHash('md5').update(data).digest('hex');
};
/** base64 encoding of a string */
module.exports.encodeBase64 = function(stringData) {
    return new Buffer(stringData).toString('base64')
};

/** Construct the express router for the action map. */
module.exports.route = function(actionMap) {
    var router = express.Router();

    // split the action map into REST paths
    var actionPaths = splitActionMap(actionMap);
    for (var method in actionPaths) {
        if (actionPaths.hasOwnProperty(method)) {
            for (var url in actionPaths) {
                if (actionPaths[method].hasOwnProperty(url)) {
                    router[method](url, routing(actionPaths[method][url]));
                }
            }
        }
    }
    return router;
};

/**
 * Generate a normalized invocation target.  This ensures that the
 * returned object is a promise.  It also provides the function's "this" with
 * a method called "defer", which creates a deferred promise, so that it's
 * easier to write a long poll implementation.
 *
 * This function has 3 argument forms, either (func), (path, func), or
 * (method, path, func).
 */
module.exports.as = normalizeRoute.normalizeAction;


/**
 * Split the action map into [method] -> [path] -> [ActionName] = object.
 */
function splitActionMap(actionMap) {
    var ret = {};
    var p;
    for (p in actionMap) {
        if (actionMap.hasOwnProperty(p)) {
            // action should already be normalized.
            var method = action.Method.toLowerCase();
            if (! ret[method]) {
                ret[method] = {};
            }
            if (! ret[method][action.UrlPath]) {
                ret[method][action.UrlPath] = {};
            }
            ret[method][action.UrlPath][p] = action;
        }
    }
    return ret;
}
