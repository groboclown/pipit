const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const xmlBodyParser = require('express-xml-bodyparser');
const aws_common = require('./lib/aws-common');
const admin = require('./admin');
const typeis = require('type-is')

var routes = require('./api/routes');

var app = express();

app.use(function (req, res, next) {
    // Fix the content type if it uses strange AWS names.
    if (req.accepts('application/x-amz-json-1.0')) {
        req.headers['content-type'] = 'application/json';
    }

    // Many times, the "Accept" parameter is not passed in.
    // When this happens, duplicate the Content-Type.
    if (! req.headers['accept']) {
        req.headers['accept'] = req.headers['content-type'];
    }

    // carry on to the next middleware chain.
    next();
});
app.use(bodyParser.json({ type: function(req) {
    return !! req.accepts('application/json') ||
        !! req.accepts('application/x-amz-json-1.0');
} }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(xmlBodyParser())
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

for (var key in routes) {
    if (routes.hasOwnProperty(key)) {
        app.use(key, aws_common.route(routes[key]));
    }
}
for (var key in admin) {
    if (admin.hasOwnProperty(key)) {
        app.use(key, admin[key]);
    }
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log("[" + req.method + ' ' + req.originalUrl + "] " + err + "\n" + err.stack);
    res.send('<ErrorResponse><Error><Type>Internal</Type><Code>InternalError</Code><Message>' +
        err.message + ": " + err + "</Message></Error><RequestId>1234</RequestId></ErrorResponse>");
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.send('<ErrorResponse><Error><Type>Internal</Type><Code>InternalError</Code><Message>' +
        err.message + "</Message></Error><RequestId>1234</RequestId></ErrorResponse>");
  });
});


module.exports = app;
