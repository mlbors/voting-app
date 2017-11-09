/**
 * freeCodeCamp - Back End Development Certification - Dynamic Web Application Projects
 * Voting App
 * 
 * @author MLBORS
 * @version 1.0.0.0
 * @since 2017.10.30
 * @for freeCodeCamp
 * @use Express.js
 */

/*******************/
/***** IMPORTS *****/
/*******************/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const session = require('express-session')
const passport = require('passport');

var index = require('./routes/index');
var users = require('./routes/users');

require('./auth/twitter');

/************************************************************/
/************************************************************/

/******************/
/***** SET UP *****/
/******************/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: true, 
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

/************************************************************/
/************************************************************/

/******************/
/***** ROUTES *****/
/******************/

app.use('/', index);
app.use('/users', users);

/************************************************************/
/************************************************************/

/******************/
/***** ERRORS *****/
/******************/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/************************************************************/
/************************************************************/

/*******************/
/***** EXPORTS *****/
/*******************/

module.exports = app;
