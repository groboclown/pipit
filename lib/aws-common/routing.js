'use strict';

const uuid = require('uuid');
const parseRequest = require('./parse-request');
const invoke = require('./invoke');

/**
 * Parses the request, grabbing all the common AWS request parameters.
 * The actionMap is the mapping between the Action of the request to the
 * function handler for the request.  The function handler takes the
 * (aws parsed data), but the response is handled
 * differently.  If the function handles the response by itself, then
 * it should return null; otherwise, it should return an array of
 * (valid response) [response code, response data] or
 * (error response) [response code, source, code, message].
 */
module.exports = function(actionMap, outputProcessing, errProcessing) {
  // Note: no "this" with this inner function
  return function(req, res, next) {
    // Common code for all AWS requests
    var aws = parseRequest(req);
    console.log(': Request ' + req.method + ' ' + req.path);

    invoke(actionMap, aws)
      .then(function t1(responseList) {
        if (!!responseList) {
          var ret;
          if (responseList[0] >= 400) {
            ret = errProcessing(aws, req, responseList[0], responseList[1],
              responseList[2], responseList[3]);
          } else {
            ret = outputProcessing(aws, req, responseList[0], responseList[1]);
          }
          _output(aws, req, res, responseList[0], ret[0], ret[1], ret[2]);
        }
      })
      .catch(function c1(err) {
        // Nope!  This puts the error in the wrong format.
        // next(err);
        console.warn(err.message + '\n' + err.stack);
        var ret = errProcessing(aws, req, 500, 'Server', 'InternalError', err.message);
        _output(aws, req, res, 500, ret[0], ret[1], ret[2]);
      })
      .catch(function c2(err) {
        // In case something went horribly wrong with the previous error processing.
        next(err);
      });
  };
};



var _output = function(aws, req, res, statusCode, data, headers) {
  res.status(statusCode);
  for (var k in headers) {
    if (headers.hasOwnProperty(k)) {
      res.set(k, headers[k]);
    }
  }
  res.send(data);
  return;
};
