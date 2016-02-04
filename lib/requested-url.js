'use strict';

var requestedUrl = function(req) {
    // The format should be "/(api)/(whatever)"
    var srcUrl = req.originalUrl;
    var host = req.get('Host');
    if (! host) {
        // really, really bad: no port number.
        host = req.hostname;
    }
    var srcUrl = req.protocol + "://" + req.get('Host') + srcUrl;
    return srcUrl;
};


module.exports = requestedUrl;
