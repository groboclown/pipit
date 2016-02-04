'use strict';

var xml2js = require('xml2js');
var uuid = require('uuid');
var crypto = require('crypto');


var aws_common = {
    gen_request_id: function() {
        return uuid.v4();
    },
    /** current epoch time in seconds */
    timestamp: function() {
        return Date.now() / 1000 | 0;
    },
    /** md5 hash hex string of a string */
    md5: function(data) {
        return crypto.createHash('md5').update(data).digest('hex');
    },
    /** base64 encoding of a string */
    encodeBase64: function(stringData) {
        return new Buffer(stringData).toString('base64')
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
    do: require('./routing')
};



module.exports = aws_common;
