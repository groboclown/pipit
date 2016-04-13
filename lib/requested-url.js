'use strict';

module.exports.requestedUrl = function requestedUrl(req) {
  // The format should be "/(api)/(whatever)"
  var srcUrl = req.originalUrl;
  var host = req.get('Host');
  if (!host) {
    // Really, really bad: no port number.
    host = req.hostname;
  }
  srcUrl = req.protocol + '://' + req.get('Host') + srcUrl;
  return srcUrl;
};
