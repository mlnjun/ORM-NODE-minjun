const mongoose = require('mongoose');


const connect = () => {
if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true);
}


mongoose.connect('mongodb://kmj:rhalswns107054!@localhost:27017/admin', {
  dbName: 'orm_admin',
  //useNewUrlParser: true,
  //useCreateIndex: true,
  }, (error) => {
    if (error) {
      console.log('몽고디비 연결 에러', error);
    } else {
      console.log('몽고디비 연결 성공');
    }
});
};
mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});

mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  connect();
});


require('./admin');
require('./member');
require('./channel');
require('./channelMember');
// require('./channelMessage');
require('./article');


module.exports = connect;