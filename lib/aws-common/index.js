'use strict';

var xml2js = require('xml2js');
var uuid = require('uuid');
var crypto = require('crypto');
var express = require('express');
var routing = require('./routing');
var test_parse = require('../test-parse.js');
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

/** basic support of paging. "vals" is an object with keys:
reverseOrder: reverseOrder,
maximumPageSize: maximumPageSize,
nextPageToken: nextPageToken,
key: '',
resultList:
 */
module.exports.pageResults = function(vals) {
    var resultList = vals.resultList;
    var reverseOrder = test_parse.parseBoolean(vals.reverseOrder);
    var maximumPageSize = vals.maximumPageSize || 100;
    var pageToken = vals.nextPageToken;
    var key = vals.key;
    if (reverseOrder) {
        resultList.reverse();
    }
    var pageStart = 0;
    if (test_parse.isValidInteger(pageToken)) {
        pageStart = test_parse.parseInteger(pageToken);
    }
    var retList = [];
    for (var i = 0; i < maximumPageSize && i + pageStart < resultList.length; i++) {
        retList.push(resultList[i]);
    }
    var nextPageToken = pageStart + retList.length;
    if (nextPageToken >= resultList.length) {
        nextPageToken = null;
    } else {
        nextPageToken = "" + nextPageToken;
    }
    var ret = { nextPageToken: nextPageToken };
    ret[key] = retList;
    return ret;
};

/** Construct the express router for the action map. */
module.exports.route = function(actionMap) {
    var router = express.Router();

    // split the action map into REST paths
    var actionPaths = splitActionMap(actionMap);
    for (var method in actionPaths) {
        if (actionPaths.hasOwnProperty(method)) {
            for (var url in actionPaths[method]) {
                if (actionPaths[method].hasOwnProperty(url)) {
                    // DEBUG
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
 * Split the action map into [method] -> [path] -> [ActionName] = object,
 * so that each of the (method, path) pairs maps to an actionMap.
 *
 * The REST based actions are handled differently.  They
 * should be a 1-to-1 mapping between (method, urlpath)
 * and the action.
 */
function splitActionMap(actionMap) {
    var ret = {};
    var p;
    var action;
    var method;
    var url;
    for (p in actionMap) {
        if (actionMap.hasOwnProperty(p)) {
            // action should already be normalized.
            action = actionMap[p];
            method = action.Method.toLowerCase();
            if (! ret[method]) {
                ret[method] = {};
            }
            if (! ret[method][action.UrlPath]) {
                ret[method][action.UrlPath] = {};
            }
            ret[method][action.UrlPath][p] = action;
        }
    }

    // Rest-based setup of the action map.
    for (method in ret) {
        if (ret.hasOwnProperty(method)) {
            for (url in ret[method]) {
                if (ret[method].hasOwnProperty(url)) {
                    p = Object.keys(ret[method][url]);
                    if (p.length == 1) {
                        action = ret[method][url][p[0]];

                        // This is most probably a Rest call.  Register
                        // it as a custom action name.
                        ret[method][url]['__REST__'] = action;
                    }
                }
            }
        }
    }


    return ret;
}
