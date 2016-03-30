'use strict';

const uuid = require('uuid');
const parse_request = require('./parse-request');
const invoke = require('./invoke');

/**
 * Parses the request, grabbing all the common AWS request parameters.
 * The actionMap is the mapping between the Action of the request to the
 * function handler for the request.  The function handler takes the
 * (aws parsed data), but the response is handled
 * differently.  If the function handles the response by itself, then
 * it should return null; otherwise, it should return an array of
 * (valid response) [response code, response data] or
 * (error response) [response code, type, code, message].
 */
module.exports = function(actionMap) {
    // Note: no "this" with this inner function
    return function(req, res, next) {
        // Common code for all AWS requests
        var aws = parse_request(req);
        console.log(": Request " + req.method + " " + req.path);

        invoke(actionMap, aws)
            .then(function (responseList) {
                if (!! responseList) {
                    if (responseList[0] >= 400) {
                        _with_error(aws, req, res, responseList[0], responseList[1], responseList[2], responseList[3]);
                    } else {
                        _with_response(aws, req, res, responseList[0], responseList[1]);
                    }
                }
            })
            .catch(function (err) {
                next(err);
            });
    };
};


/**
 * Send a valid response back to the caller.
 */
 var _with_response = function(aws, req, res, statusCode, data) {
    var retData = {};
    if (req.accepts('application/json')) {
        retData = data;
    } else {
        retData[aws.action + 'Response'] = {
            'ResponseMetadata': {
                'RequestId': gen_request_id()
            }
        };
        retData[aws.action + 'Response'][aws.action + 'Result'] = data;
    }
    _output(aws, req, res, statusCode, retData, true);
};

/**
 *      statusCode: error status (int)
 *      type: error type (string)
 *      code: error code (string)
 *      message: error message (string)
 */
var _with_error = function(aws, req, res, statusCode, type, code, message) {
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
    _output(aws, req, res, statusCode, resData, false);
};



var _output = function(aws, req, res, statusCode, data, useValidTop) {
    res.status(statusCode);
    // console.log(":: requested accept: " + req.get('Accept'));
    if (aws.isRest) {
        console.log(":::: " + JSON.stringify(data) + " ::::");
        res.send(data);
        return;
    }
    res.format({
        // first formatter is the default; default is to return xml
        'text/xml': function() {
            // console.log(":: returning result as xml");
            res.set('Content-Type', 'text/xml');
            var ret = _to_xml(data, useValidTop);
            console.log(":::: " + ret + " ::::");
            res.send(ret);
        },
        'application/json': function() {
            // console.log(":: returning result as json");
            res.send(data);
        },
        /*
        'application/x-amz-json-1.0': function() {
            // console.log(":: returning result as json");
            res.set('Content-Type', 'application/x-amz-json-1.0');
            res.send(JSON.stringify(data));
        },
        */
        'text/plain': function() {
            // console.log(":: returning result as text");
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

var gen_request_id = function() {
    return uuid.v4();
};
