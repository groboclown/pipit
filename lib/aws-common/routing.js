'use strict';

var injections = require('./injections');
var uuid = require('uuid');

/**
 * Parses the request, grabbing all the common AWS request parameters.
 * The actionMap is the mapping between the Action of the request to the
 * function handler for the request.  The function handler takes the
 * (req, res), but the response is handled
 * differently.  If the function handles the response by itself, then
 * it should return null; otherwise, it should return an array of
 * (valid response) [response code, response data] or
 * (error response) [response code, type, code, message].
 */
var routing = function(actionMap) {
    // Note: no "this" with this inner function
    return function(req, res, next) {
        // Common code for all AWS requests

        // The format should be "/(api)/(whatever)"
        var srcUrl = req.originalUrl;
        // console.log(":original url: " + srcUrl);
        var endUrlPos = srcUrl.indexOf('?');
        if (endUrlPos >= 0) {
            srcUrl = srcUrl.substr(0, endUrlPos);
        }

        var serviceName = "unknown"
        var baseUrl = srcUrl + '/';
        endUrlPos = srcUrl.indexOf('/', 1);
        if (endUrlPos > 0) {
            // strip off the trailing /
            serviceName = srcUrl.substr(1, endUrlPos - 1);
            // include the found slash
            baseUrl = srcUrl.substr(0, endUrlPos + 1);
        }

        var host = req.get('Host');
        if (! host) {
            // really, really bad: no port number.
            host = req.hostname;
        }
        baseUrl = req.protocol + "://" + req.get('Host') + baseUrl;


        req.aws = {
            baseUrl: baseUrl,
            serviceName: serviceName,
            params: (req.method === 'POST') ? req.body : req.query
        };
        _parseAwsAuth(req);

        console.log(": Request " + req.method + " " + req.path);

        if (! actionMap[req.aws.action]) {
            _with_error(req, res, 400, 'Sender', 'InvalidAction', 'Unsupported action ' + req.aws.action);
        } else {
            var responseHandler = function(responseList) {
                if (!! responseList) {
                    if (responseList[0] >= 400) {
                        _with_error(req, res, responseList[0], responseList[1], responseList[2], responseList[3]);
                    } else {
                        _with_response(req, res, responseList[0], responseList[1]);
                    }
                }
            }

            var actionResponseHandler = function(responseList) {
                if (!! responseList) {
                    // allow for after-operation injection, even if the before
                    // injector returned a value.
                    response = injections.invokeAfterFor(serviceName, req.aws.action, req, responseList);
                }
                responseHandler(responseList);
            };

            console.log(":: Running action " + req.aws.action);
            var response = injections.invokeBeforeFor(serviceName, req.aws.action, req);
            if (!! response) {
                responseHandler(response);
            } else {
                // Not injected before action, so perform the API mockup.
                // Allow for long poll in the markup; it's a special object
                // that returns a promise.
                if (!! actionMap[req.aws.action].LongPoll) {
                    actionMap[req.aws.action].LongPoll(req)
                        .then(actionResponseHandler)
                        .catch(function (err) { next(err); });
                    return;
                }
                response = actionMap[req.aws.action](req);
                actionResponseHandler(response);
            }
        }
    };
};


/**
 * Send a valid response back to the caller.
 */
 var _with_response = function(req, res, statusCode, data) {
    var retData = {};
    retData[req.aws.action + 'Response'] = {
        'ResponseMetadata': {
            'RequestId': gen_request_id()
        }
    };
    retData[req.aws.action + 'Response'][req.aws.action + 'Result'] = data;
    _output(req, res, statusCode, retData, true);
    //_output(req, res, statusCode, data, true);
};

/**
 *      statusCode: error status (int)
 *      type: error type (string)
 *      code: error code (string)
 *      message: error message (string)
 */
var _with_error = function(req, res, statusCode, type, code, message) {
    var requestId = gen_request_id();
    var resData = {
        "ErrorResponse": {
            "Error": {
                "Type": type || "Sender",
                "Code": code,
                "Message": message
            },
            "RequestId": requestId
        }
    };
    _output(req, res, statusCode, resData, false);
};



var _output = function(req, res, statusCode, data, useValidTop) {
    res.status(statusCode);
    console.log(":: requested accept: " + req.get('Accept'));
    res.format({
        // first formatter is the default; default is to return xml
        'text/xml': function() {
            console.log(":: returning result as xml");
            res.set('Content-Type', 'text/xml');
            // res.send(_to_xml(data, useValidTop));
            var ret = _to_xml(data, useValidTop);
            console.log(":::: " + ret + " ::::");
            res.send(ret);
        },
        'application/json': function() {
            console.log(":: returning result as json");
            res.send(data);
        },
        'text/plain': function() {
            console.log(":: returning result as text");
            res.set('Content-Type', 'text/plain');
            res.send(data.toString());
        }
    });
};

var _to_xml = function(data, useValidTop) {
    if (data === null || data === undefined) {
        return "null";
    }
    if (typeof data === 'string' || data.constructor === Number) {
        return _to_xml_str(data);
    }

    var ret = "";
    var tag = function(tagName, text) {
        var r = "<" + tagName;
        if (useValidTop) {
            r += " xmlns='http://sqs.us-east-1.amazonaws.com/doc/2012-11-05/' " +
                "xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:type='" +
                tagName + "'";
        }
        if (text === null || text === "") {
            r += "/>";
        } else {
            r += ">" + text + "</" + tagName + ">";
        }
        return r;
    }

    for (var property in data) {
        if (data.hasOwnProperty(property)) {
            // Arrays
            if (Object.prototype.toString.call(data[property]) === "[object Array]") {
                // Shouldn't ever be the top element...
                for (var i = 0; i < data[property].length; i++) {
                    ret += tag(property, _to_xml(data[property][i], false));
                }

            // Objects
            } else if (Object.prototype.toString.call(data[property]) === "[object Object]") {
                ret += tag(property, _to_xml(data[property], false));

            // No corresponding value (stand-alone tag)
            } else if (data[property] === null || data[property] === undefined) {
                ret += tag(property, null);

            // Simple data types
            } else {
                ret += tag(property, _to_xml_str(data[property]));
            }
        }
    }

    return ret;
};

var _to_xml_str = function(data) {
    if (typeof data !== 'string') {
        data = data.toString();
    }
    return data.toString().replace(/&/gm, "&amp;")
        .replace(/</gm, "&lt;")
        .replace(/>/gm, "&gt;")
        .replace(/"/gm, "&quot;")
        .replace(/'/gm, "&apos;");
};

var _parseAwsAuth = function(req) {
    var version = req.aws.params['Version'];
    var action = req.aws.params['Action'];
    var accessKey = req.aws.params['AWSAccessKeyId'];
    var expires = req.aws.params['Expires'];
    var signature = req.aws.params['Signature'];
    var signatureMethod = req.aws.params['SignatureMethod'];
    var signatureVersion = req.aws.params['SignatureVersion'];
    var timestamp = req.aws.params['Timestamp'];
    var region = req.aws.params['Region'];
    var authorization = req.get('Authorization');

    if (!! authorization) {
        // newer authorization method
        authorization = authorization.trim();
        var p = authorization.indexOf(' ');
        if (p > 0) {
            signatureMethod = authorization.substr(0, p).trim();
            signatureVersion = signatureMethod.substr(0, signatureMethod.indexOf('-'));
            var signParts = authorization.substr(p + 1).split(",");
            for (var i = 0; i < signParts.length; i++) {
                p = signParts[i].indexOf('=');
                if (p > 0) {
                    switch (signParts[i].substr(0, p).trim()) {
                        case "Credential":
                            var credentialParts = signParts[i].substr(p + 1).trim().split("/");
                            accessKey = credentialParts[0].trim();
                            timestamp = credentialParts[1].trim();
                            region = credentialParts[2].trim();
                            // service = credentialParts[3].trim();
                            // "aws_request" === credentialParts[4].trim();
                            break;
                        case "SignedHeaders":
                            // ignore
                            break;
                        case "Signature":
                            signature = signParts[i].substr(p + 1).trim();
                            break;
                    }
                }
            }
        }
    }
    req.aws.version = version;
    req.aws.action = action;
    req.aws.accessKey = accessKey;
    req.aws.expires = expires;
    req.aws.signature = signature;
    req.aws.signatureMethod = signatureMethod;
    req.aws.signatureVersion = signatureVersion;
    req.aws.timestamp = timestamp;
    req.aws.region = !! region ? region : "ZN-MOCK-1";
};

var gen_request_id = function() {
    return uuid.v4();
};


module.exports = routing;
