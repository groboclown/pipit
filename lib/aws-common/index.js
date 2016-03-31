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

    // Special handler for custom input processing
    for (var i = 0; i < actionMap.pre.length; i++) {
        router.use(actionMap.pre[i]);
    }

    // handle each method/url action type.
    actionMap.forEachMethodUrl(function (method, url, actions) {
        router[method](url, routing(actions, actionMap.output, actionMap.err_output));
    });

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
