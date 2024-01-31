var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var debug = require('debug');


// dotenv 패키지 참조
require('dotenv').config();

const webSocket = require("./socket");

// 레이아웃 패키지
var expressLayouts = require('express-ejs-layouts');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var channelRouter = require('./routes/channel');
var channelAPIRouter = require('./routes/channelAPI');
var memberAPIRouter = require('./routes/memberAPI');

var sequelize = require('./models/index.js').sequelize;

var app = express();

sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 레이아웃 설정
app.set('layout', 'layout');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);
app.set('layout extractMetas', true);
app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/chat', channelRouter);
app.use('/api/channel', channelAPIRouter);
app.use('/api/member', memberAPIRouter);

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


//노드앱의 기본 WAS 서비스 포트
app.set('port', process.env.PORT || 3000);

//노드앱이 작동되는 서버 객체 생성 
var server = app.listen(app.get('port'),function(){

});
//웹소켓 express서버와 연결처리
//webSocket모듈에 nodeapp이 실행되는 서버객체를 전달합니다.
//socket.io 소켓모듈과 node express앱을 통합해줍니다.
webSocket(server);


server.on('error', onError);
server.on('listening', onListening);
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var port = app.get('port');

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
