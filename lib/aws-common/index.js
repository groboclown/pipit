'use strict';

const xml2js = require('xml2js');
const uuid = require('uuid');
const crypto = require('crypto');
const express = require('express');
const routing = require('./routing');
const testParse = require('../test-parse.js');
const normalizeRoute = require('./normalize-route');

module.exports.genRequestId = function genRequestId() {
  return uuid.v4();
};
module.exports.genArn = function genArn(aws) {
  var path = '';
  for (var i = 1; i < arguments.length; i++) {
    path += ':' + arguments[i];
  }
  return 'arn:aws:' + aws.serviceName + ':' + aws.region + path;
};

/** Current epoch time in seconds */
module.exports.timestamp = function timestamp() {
  return Date.now() / 1000 | 0;
};
/** The md5 hash hex string of a string */
module.exports.md5 = function(data) {
  return crypto.createHash('md5').update(data).digest('hex');
};
/** The base64 encoding of a string */
module.exports.encodeBase64 = function(stringData) {
  return new Buffer(stringData).toString('base64');
};

/** Basic support of paging. "vals" is an object with keys:
reverseOrder: reverseOrder,
maximumPageSize: maximumPageSize,
nextPageToken: nextPageToken,
key: '',
resultList:
 */
module.exports.pageResults = function pageResults(vals) {
  var resultList = vals.resultList;
  var reverseOrder = testParse.parseBoolean(vals.reverseOrder);
  var maximumPageSize = vals.maximumPageSize || 100;
  var pageToken = vals.nextPageToken;
  var key = vals.key;
  if (reverseOrder) {
    resultList.reverse();
  }
  var pageStart = 0;
  if (testParse.isValidInteger(pageToken)) {
    pageStart = testParse.parseInteger(pageToken);
  }
  var retList = [];
  for (var i = 0; (
        i < maximumPageSize && i + pageStart < resultList.length
      ); i++) {
    retList.push(resultList[i]);
  }
  var nextPageToken = pageStart + retList.length;
  if (nextPageToken >= resultList.length) {
    nextPageToken = null;
  } else {
    nextPageToken = '' + nextPageToken;
  }
  var ret = { nextPageToken: nextPageToken };
  ret[key] = retList;
  return ret;
};

/** Construct the express router for the action map. */
module.exports.route = function route(actionMap) {
  var router = express.Router();

  // Special handler for custom input processing
  for (var i = 0; i < actionMap.pre.length; i++) {
    router.use(actionMap.pre[i]);
  }

  // Handle each method/url action type.
  actionMap.forEachMethodUrl(function femu(method, url, actions) {
    router[method](url,
      routing(actions, actionMap.output, actionMap.errOutput));
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
