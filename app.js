const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const xmlBodyParser = require('express-xml-bodyparser');

var routes = require('./api/routes');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(xmlBodyParser())
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

for (var key in routes) {
    if (routes.hasOwnProperty(key)) {
        app.use(key, routes[key]);
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
