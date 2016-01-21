//Setup database et dependencies
var mongoose = require('mongoose');
require('./models/User');
require('./models/Group');
require('./models/Payment');
require('./models/Bill');
mongoose.connect('mongodb://localhost/bigpurple52_Web');
var session = require('express-session');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var home = require('./routes/home.server.route');
var register = require('./routes/register.server.route');
var connection = require('./routes/connection.server.route');
var userProfile = require('./routes/userProfile.server.route');
var group = require('./routes/group.server.route');
var friend = require('./routes/friend.server.route');
var side_menu = require('./routes/side_menu.server.route');
var allExpenses = require('./routes/allExpenses.server.route');
var edit = require('./routes/edit.server.route');
var delet = require('./routes/delete.server.route');

var app = express();

var sessionOptions = {
  secret: "secret",
  resave : true,
  saveUninitialized : false
};
app.use(session(sessionOptions));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/', home);
app.use('/', register);
app.use('/', connection);
app.use('/', userProfile);
app.use('/', group);
app.use('/', friend);
app.use('/', side_menu);
app.use('/', allExpenses);
app.use('/', edit);
app.use('/', delet);

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
