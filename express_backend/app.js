const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bcrypt = require('bcrypt');

//allows for cross origin resource sharing between the frontend and the server
const cors = require("cors");

const db = require('./db');
const dbHelpers = require('./models/index')(db, bcrypt);
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');
const lessonRouter = require('./routes/lessons');
const subscriptionsRouter = require('./routes/subscriptions');
const contactRouter = require('./routes/contact');

const app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter(dbHelpers));
app.use('/api/courses', coursesRouter(dbHelpers));
app.use('/api/lessons', lessonRouter(dbHelpers));
app.use('/api/subscriptions', subscriptionsRouter(dbHelpers));
app.use('/api/contact', contactRouter);


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
