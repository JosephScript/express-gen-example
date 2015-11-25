var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// require our router modules
var index = require('./routes/index');
var kittehs = require('./routes/kittehs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// sets up morgan to be a logging tool for console.log
app.use(logger('dev'));

// sets up JSON and x-www-url-formEncoded request bodies to be used in req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// cookies, we're not using these
app.use(cookieParser());

// static routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/jquery',
  express.static(path.join(__dirname, 'node_modules/jquery/dist')));

// finally, use our routes on these base URLs
app.use('/', index);
app.use('/kittehs', kittehs);

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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
