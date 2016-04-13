'use strict';

const xmlBodyParser = require('express-xml-bodyparser');
const bodyParser = require('body-parser');
const uuid = require('uuid'); // FIXME eliminate this extra dependency

// Disable the camel case requirement, because we have
// a special naming convension for the discover-by-prototype
// usage.
// jscs: disable requireCamelCaseOrUpperCaseIdentifiers

/**
 * Allows for custom definitions of the input and output handlers.
 * Each API can have custom input and output processing that needs
 * to be handled in a specific way.  This module contains the common
 * handlers.
 *
 * A good amount of detail describing the expected output is defined
 * here:
 * https://github.com/boto/botocore/blob/develop/botocore/parsers.py
 */

module.exports = function(protocol, mod, namespace) {
  protocol = protocol.replace('-', '_');
  mod.processInput = module.exports[protocol + '__input'];
  if (!!namespace) {
    mod.processOutput = function po(aws, req, statusCode, data) {
      return module.exports[protocol + '__output'](
        aws, req, statusCode, data, namespace);
    };
  } else {
    mod.processOutput = module.exports[protocol + '__output'];
  }
  mod.processError = module.exports[protocol + '__error'];
};

// ----------------------------------------------------------------------------
// "query" protocol

module.exports.query__error = function query__error(aws, req, statusCode, source, errCode, message) {
  var requestId = genRequestId();
  var retData = {
    ErrorResponse: {
      Error: {
        Type: source || 'Sender',
        Code: errCode,
        Message: message,
      },
      RequestId: requestId,
    },
  };
  var headers = {
    'Content-Type': 'text/xml',
  };
  return [ module.exports.dictToXml(retData, null), headers ];
};

module.exports.query__output = function query__output(aws, req, statusCode, data, namespace) {
  var retData = {};
  retData[aws.action + 'Response'] = {
    ResponseMetadata: {
      RequestId: genRequestId(),
    },
  };
  retData[aws.action + 'Response'][aws.action + 'Result'] = data;
  var headers = {
    'Content-Type': 'text/xml',
  };

  return [ module.exports.dictToXml(retData, namespace), headers ];
};

module.exports.query__input = [
  bodyParser.urlencoded({ extended: false }),
];


// ----------------------------------------------------------------------------
// "json" protocol

module.exports.json__error = function json__error(aws, req, statusCode, type, errCode, message) {
  var retData = {
    __type: errCode,
    message: message,
  };
  var headers = {
    'Content-Type': 'application/json',
  };
  return [ JSON.stringify(retData), headers ];
};

module.exports.json__output = function json__output(aws, req, statusCode, data) {
  var headers = {
    'Content-Type': 'application/json',
  };
  return [ JSON.stringify(data), headers ];
};

module.exports.json__input = [
  bodyParser.json({
    type: function(req) {
      return !!req.accepts('application/json') ||
          !!req.accepts('application/x-amz-json-1.0');
    },
  }),
];



// ----------------------------------------------------------------------------
// "rest-json" protocol

module.exports.rest_json__error = function rest_json__error(aws, req, statusCode, type, errCode, message) {
  var retData = {
    message: message,
  };
  var headers = {
    'Content-Type': 'application/json',
    'x-amzn-errortype': errCode + ':',
  };
  return [ JSON.stringify(retData), headers ];
};

module.exports.rest_json__output = module.exports.json__output;
module.exports.rest_json__input = module.exports.json__input;


// ----------------------------------------------------------------------------
// "rest-xml" protocol

// TODO s3 has a different error output form compared to the other rest-xml
// services.
module.exports.rest_xml__error = module.exports.query__error;
module.exports.rest_xml__output = module.exports.query__output;
module.exports.rest_xml__input = module.exports.query__input;

// ----------------------------------------------------------------------------
// "ec2" protocol
// This is nearly identical to the "query" protocol.

// jscs:disable
module.exports.ec2_error = function ec2_error(aws, req, statusCode, source, errCode, message) {
  var requestId = genRequestId();
  var retData = {
    Response: {
      Errors: {
        Error: {
          Type: source || 'Sender',
          Code: errCode,
          Message: message,
        },
      },
      RequestID: requestId,
    },
  };
  var headers = {
    'Content-Type': 'text/xml',
  };
  return [ module.exports.dictToXml(retData, null), headers ];
};

module.exports.ec2__output = module.exports.query__output;
module.exports.ec2__input = module.exports.query__input;

// ----------------------------------------------------------------------------
// utility

module.exports.dictToXml = function(data, namespace) {
  if (data === null || data === undefined) {
    return 'null';
  }
  if (typeof data === 'string' || data.constructor === Number) {
    return _toXmlStr(data);
  }

  var ret = '';
  var tag = function(tagName, text) {
    var r = '<' + tagName;
    if (!!namespace) {
      r += ' xmlns="' + namespace + '" ' +
          'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="' +
          tagName + '"';
    }
    if (text === null || text === '') {
      r += '/>';
    } else {
      r += '>' + text + '</' + tagName + '>';
    }
    return r;
  };

  for (var property in data) {
    if (data.hasOwnProperty(property)) {
      // Arrays
      if (Object.prototype.toString.call(data[property]) === '[object Array]') {
        // Shouldn't ever be the top element...
        for (var i = 0; i < data[property].length; i++) {
          ret += tag(property,
            module.exports.dictToXml(data[property][i], false));
        }

      // Objects
      } else if (Object.prototype.toString.call(data[property]) ===
            '[object Object]') {
        ret += tag(property, module.exports.dictToXml(data[property], false));

      // No corresponding value (stand-alone tag)
      } else if (data[property] === null || data[property] === undefined) {
        ret += tag(property, null);

      // Simple data types
      } else {
        ret += tag(property, _toXmlStr(data[property]));
      }
    }
  }

  return ret;
};

var _toXmlStr = function(data) {
  if (typeof data !== 'string') {
    data = data.toString();
  }
  return data.toString().replace(/&/gm, '&amp;')
    .replace(/</gm, '&lt;')
    .replace(/>/gm, '&gt;')
    .replace(/"/gm, '&quot;')
    .replace(/'/gm, '&apos;');
};

var genRequestId = function() {
  return uuid.v4();
};
