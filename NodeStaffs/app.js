var createError = require('http-errors');
var express = require('express');
var path = require('path');
var url = require('url');
var qs = require('qs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// 写成中间件形式
function getParamsMiddle(req, res,next) {
   var  query = {};
  if(req.method.toLocaleLowerCase()=='post') {
      query = req.body;
  } else if(req.method.toLocaleLowerCase()=='get'){
      // req.url : http://localhost:9090/kkk?name=pp&age=pp
      const urlJson = url.parse(req.url);  //urlJson.query : name=pp&age=pp
      query = qs.parse(urlJson.query);   // {name:'pp',age:'pp'}
  } else {
    console.log(req.url);
  }
  req.query = query;
  console.log('参数');
  console.log(query);
  next();
}

// view engine setup,
//views目录下相当于你的视图。这里创建你要的公共模块 html等等

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(getParamsMiddle);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
