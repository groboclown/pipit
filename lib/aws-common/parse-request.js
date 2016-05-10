'use strict';

const psplit = require('../psplit.js');

/**
 * Take an express HTTP request object, and convert it into an aws object
 * with all the values parsed out.
 */
module.exports = function(req) {
  // Common code for all AWS requests

  // The format should be "/(api)/(whatever)"
  var srcUrl = req.originalUrl;
  // DEBUG console.log(":original url: " + srcUrl);
  var endUrlPos = srcUrl.indexOf('?');
  if (endUrlPos >= 0) {
    srcUrl = srcUrl.substr(0, endUrlPos);
  }

  var serviceName = 'unknown';
  var baseUrl = srcUrl + '/';
  endUrlPos = srcUrl.indexOf('/', 1);
  if (endUrlPos > 0) {
    // Strip off the trailing /
    serviceName = srcUrl.substr(1, endUrlPos - 1);
    // Include the found slash
    baseUrl = srcUrl.substr(0, endUrlPos + 1);
  }

  var host = req.get('Host');
  if (!host) {
    // Really, really bad: no port number.
    host = req.hostname;
  }
  baseUrl = req.protocol + '://' + req.get('Host') + baseUrl;

  var reqParams = (req.method === 'POST') ? req.body : req.query;
  var ret = {
    baseUrl: baseUrl,
    requestUrl: req.originalUrl,
    serviceName: serviceName,
    params: reqParams,
    restParams: req.params,
    data: psplit.split(reqParams),
  };

  var version = reqParams.Version;
  var action = reqParams.Action;
  var accessKey = reqParams.AWSAccessKeyId;
  var expires = reqParams.Expires;
  var signature = reqParams.Signature;
  var signatureMethod = reqParams.SignatureMethod;
  var signatureVersion = reqParams.SignatureVersion;
  var timestamp = reqParams.Timestamp;
  var region = reqParams.Region;
  var authorization = req.get('Authorization');

  if (!!authorization) {
    // Newer authorization method
    authorization = authorization.trim();
    var p = authorization.indexOf(' ');
    if (p > 0) {
      signatureMethod = authorization.substr(0, p).trim();
      signatureVersion = signatureMethod.substr(
        0, signatureMethod.indexOf('-'));
      var signParts = authorization.substr(p + 1).split(',');
      for (var i = 0; i < signParts.length; i++) {
        p = signParts[i].indexOf('=');
        if (p > 0) {
          switch (signParts[i].substr(0, p).trim()) {
            case 'Credential': {
              var credentialParts =
                signParts[i].substr(p + 1).trim().split('/');
              accessKey = credentialParts[0].trim();
              timestamp = credentialParts[1].trim();
              region = credentialParts[2].trim();
              // DEBUG service = credentialParts[3].trim();
              // DEBUG "aws_request" === credentialParts[4].trim();
              break;
            }
            case 'SignedHeaders': {
              // Ignore
              break;
            }
            case 'Signature': {
              signature = signParts[i].substr(p + 1).trim();
              break;
            }
          }
        }
      }
    }
  }

  if (!action) {
    // This is an interesting setup - the action to perform is passed as
    // the target header, with the method of invocation using
    // "FullServiceName.Action"
    action = req.get('X-Amz-Target');
    if (!!action && action.indexOf('.') > 0) {
      action = action.substr(action.indexOf('.') + 1);
    }
  }

  ret.reqParams = reqParams;
  ret.version = version;
  ret.action = action;
  ret.accessKey = accessKey;
  ret.expires = expires;
  ret.signature = signature;
  ret.signatureMethod = signatureMethod;
  ret.signatureVersion = signatureVersion;
  ret.timestamp = timestamp;
  ret.region = (!!region ? region : 'ZN-MOCK-1');
  ret.isRest = (!action);
  return ret;
};
