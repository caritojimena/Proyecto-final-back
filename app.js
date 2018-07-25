let createError = require('http-errors'),
  express = require('express'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  compression = require('compression'),
  sessionVerifier = require('./modules/session-verifier');

require('./modules/authentication-verifier');

var allRouter = require('./routes/all'),
  indexRouter = require('./routes/index'),
  fileRouter = require('./routes/file'),
  usersRouter = require('./routes/users'),
  friendsRouter = require('./routes/friends'),
  postRouter = require('./routes/post/post'),
  likeRouter = require('./routes/post/like'),
  commentRouter = require('./routes/post/comment');

var app = express();

config.application.systemPath = __dirname;

app.use(compression({ threshold: 0, windowBits: 14, memLevel: 9, filter: (req, res) => (true) }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(allRouter);
app.use('/', indexRouter);

//for user feature
app.use('/user', usersRouter);
app.use('/user', friendsRouter);

app.use('/file', fileRouter);

//for post feature
app.use('/post', postRouter);
app.use('/post', likeRouter);
app.use('/post', commentRouter);

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
  res.json('error');
});

module.exports = app;