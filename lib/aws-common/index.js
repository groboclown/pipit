
var xml2js = require('xml2js');
var uuid = require('uuid');

var aws_common = {
    gen_request_id: function() {
        return uuid.v4();
    },

    getPost: function(router, path, actionMap) {
        router.get(path, this.do(actionMap));
        router.post(path, this.do(actionMap));
    },

    // for balance on the getPost method.
    post: function(router, path, actionMap) {
        router.post(path, this.do(actionMap));
    },

    /**
     * Parses the request, grabbing all the common AWS request parameters.
     * The actionMap is the mapping between the Action of the request to the
     * function handler for the request.  The function handler takes the
     * standard (req, res, next) arguments, but the response is handled
     * differently.  If the function handles the response by itself, then
     * it should return null; otherwise, it should return an array of
     * (valid response) [response code, response data] or
     * (error response) [response code, type, code, message].
     */
    do: function(actionMap) {
        // Note: no "this" with this inner function
        return function(req, res, next) {
            // Common code for all AWS requests

            // The format should be "/(api)/(whatever)"
            var srcUrl = req.originalUrl;
            console.log(":original url: " + srcUrl);
            var endUrlPos = srcUrl.indexOf('?');
            if (endUrlPos >= 0) {
                srcUrl = srcUrl.substr(0, endUrlPos);
            }

            var baseUrl = srcUrl + '/';
            endUrlPos = srcUrl.indexOf('/', 1);
            if (endUrlPos > 0) {
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
                param: function(k, d) { return _parm(req, k, d); },
                hasParam: function(k) { return _parm(req, k, null) !== null },
                paramForEach: function(k, f) { return _parmArrayForEach(req, k, f); },
                paramMap: function(k, f) { return _parmMapForEach(req, k, f); },
                paramArray: function(k) { return _parmArray(req, k); },
                paramDict: function(k, f) { return _parmHash(req, k, f); }
            };
            _parseAwsAuth(req);

            console.log(": Request " + req.method + " " + req.path);

            if (! actionMap[req.aws.action]) {
                aws_common.with_error(req, res, 400, 'Sender', 'InvalidAction', 'Unsupported action ' + req.aws.action);
            } else {
                console.log(":: Running action " + req.aws.action);
                response = actionMap[req.aws.action](req, res, next);
                if (!! response) {
                    if (response[0] >= 400) {
                        aws_common.with_error(req, res, response[0], response[1], response[2], response[3]);
                    } else {
                        aws_common.with_response(req, res, response[0], response[1]);
                    }
                }
            }
        };
    },

    /**
     * Send a valid response back to the caller.
     */
    with_response: function(req, res, statusCode, data) {
        retData = {};
        retData[req.aws.action + 'Response'] = {
            'ResponseMetadata': {
                'RequestId': aws_common.gen_request_id()
            }
        };
        retData[req.aws.action + 'Response'][req.aws.action + 'Result'] = data;
        _output(req, res, statusCode, retData, true);
        //_output(req, res, statusCode, data, true);
    },

    /**
     *      statusCode: error status (int)
     *      type: error type (string)
     *      code: error code (string)
     *      message: error message (string)
     */
    with_error: function(req, res, statusCode, type, code, message) {
        var requestId = aws_common.gen_request_id();
        var res_data = {
            "ErrorResponse": {
                "Error": {
                    "Type": type || "Sender",
                    "Code": code,
                    "Message": message
                },
                "RequestId": requestId
            }
        };
        _output(req, res, statusCode, res_data, false);
    },
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
}

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

var _parm = function(req, key, defaultValue) {
    if (req.method == 'POST') {
        // force post requests to pass in their arguments through the body
        return !! req.body.hasOwnProperty(key) ? req.body[key] : defaultValue;
    }
    return !! req.query.hasOwnProperty(key) ? req.query[key] : defaultValue;
};

var _parmArray = function(req, key) {
    var ret = [];
    var index = 1;
    while (_parm(req, key + '.' + index, null) !== null) {
        ret.push(_parm(req, key + '.' + index, null));
        index++;
    }
    return ret;
};

var _parmHash = function(req, key) {
    var ret = {};
    var index = 1;
    while (_parm(req, key + '.' + index + '.Name', null) !== null) {
        ret[_parm(req, key + '.' + index + '.Name', null)] =
            _parm(req, key + '.' + index + '.Value', null);
        index++;
    }
};

var _parmMapForEach = function(req, key, func) {
    var index = 1;
    while (_parm(req, key + '.' + index + '.Name', null) !== null) {
        func(_parm(req, key + '.' + index + '.Name', null),
            _parm(req, key + '.' + index + '.Value', null));
        index++;
    }
};

var _parmArrayForEach = function(req, key, func) {
    var index = 1;
    while (_parm(req, key + '.' + index, null) !== null) {
        func(_parm(req, key + '.' + index, null));
        index++;
    }
};

var _parseAwsAuth = function(req) {
    var version = _parm(req, 'Version', null);
    var action = _parm(req, 'Action', null);
    var accessKey = _parm(req, 'AWSAccessKeyId', null);
    var expires = _parm(req, 'Expires', null);
    var signature = _parm(req, 'Signature', null);
    var signatureMethod = _parm(req, 'SignatureMethod', null);
    var signatureVersion = _parm(req, 'SignatureVersion', null);
    var timestamp = _parm(req, 'Timestamp', null);
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
                            // region = credentialParts[2].trim();
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
};

module.exports = aws_common;
