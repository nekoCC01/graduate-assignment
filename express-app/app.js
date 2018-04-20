var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('dotenv').config();

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

//connect to DB
var uri = 'mongodb://' + process.env.DB_USER + ':'
    + process.env.DB_PASS
    + '@hes-mean-shard-00-00-cywuc.mongodb.net:27017,hes-mean-shard-00-01-cywuc.mongodb.net:27017,hes-mean-shard-00-02-cywuc.mongodb.net:27017/graduate-assignment?ssl=true&replicaSet=HES-mean-shard-0&authSource=admin';
mongoose.connect(uri);
var db = mongoose.connection;
db.on('error', (err) => {console.error(`connection error: ${err}`);});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

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

module.exports = app;
