'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const xmlBodyParser = require('express-xml-bodyparser');
const awsCommon = require('./lib/aws-common');
const admin = require('./admin');
const typeis = require('type-is');

var routes = require('./api/routes');

var app = express();

for (var key in routes) {
  if (routes.hasOwnProperty(key)) {
    app.use(key, awsCommon.route(routes[key]));
  }
}
for (var key in admin) {
  if (admin.hasOwnProperty(key)) {
    app.use(key, admin[key]);
  }
}

// Generic error handlers

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Development error handler
// - Will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log('[' + req.method + ' ' + req.originalUrl + '] ' +
      err + '\n' + err.stack);
    res.send(
      '<ErrorResponse><Error><Type>Internal</Type>' +
      '<Code>InternalError</Code><Message>' +
      err.message + ': ' + err +
      '</Message></Error><RequestId>1234</RequestId></ErrorResponse>');
  });
}

// Production error handler
// - No stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.send('<ErrorResponse><Error><Type>Internal</Type>' +
      '<Code>InternalError</Code><Message>' +
      err.message +
      '</Message></Error><RequestId>1234</RequestId></ErrorResponse>');
  });
});


module.exports = app;
