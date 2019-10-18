var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./controllers/index');

// add connection to new controller
const tasksRouter = require('./controllers/tasks');
const ordersRouter = require('./controllers/orders');

var app = express();
const port = 3000;

// connect to the database or catch trying
const mongoose = require('mongoose');
const globals = require('./config/globals');

mongoose.connect(globals.db,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
    ).then(
    (res) => {
      console.log("I'm in")
    }
).catch(() => {
  console.log("Abort mission")
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//
// // map any url's starting with "/tasks" to the tasks controller
app.use('/tasks', tasksRouter);
// map any url's starting with "/orders" to the orders controller
app.use('/orders', ordersRouter);

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