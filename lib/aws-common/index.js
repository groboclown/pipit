'use strict';

var xml2js = require('xml2js');
var uuid = require('uuid');
var crypto = require('crypto');
var express = require('express');
var routing = require('./routing');

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

module.exports.route = function(actionMap) {
    var router = express.Router();
    var awsHandler = routing(actionMap);
    router.post('/', awsHandler);
    return router;
};
