/*
 * @Author: your name
 * @Date: 2020-12-26 10:01:22
 * @LastEditTime: 2021-06-01 16:21:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my_express\app.js
 */
require('./db')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login')
var minioRouter = require('./routes/minio')
var bigFileUploadRouter = require('./routes/bigFileUpload')
var jdSpider = require('./routes/jdSpider')
var hash=require('pbkdf2-password')
var session=require('express-session')
var cors=require('cors')
var app = express();

// app.use(allowCrossDomain)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cors())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:'secret',
  resave:true,
  saveUninitialized:false,
  cookie:{
    maxAge:1000*60*3
  }
}))

app.use(function(req,res,next){
  console.log(req.session,'eee')
  next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/minio', minioRouter)
app.use('/bigFile', bigFileUploadRouter)
app.use('/jdSpider', jdSpider)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {    
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;