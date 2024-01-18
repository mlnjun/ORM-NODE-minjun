// socket.io 패키지 참조
const SocketIO = require("socket.io");

// moment 패키지 참조
const moment = require('moment');


module.exports = (server)=>{

  const io = SocketIO(server, {
    path: "/socket.io",
    cors: {
      origin: "*",  //  "*" > 모든 도메인,모바일
      methods: ["GET", "POST"],
    },
  });


  io.on("connection",async(socket)=>{

    socket.on("broadcast", async(msg)=>{
      io.emit("receiveAll", msg);
    });

    socket.on("test", async(nickname, msg)=>{
      var sendingDate = moment(Date.now()).format('YYYY-MM-DD hh:mm:ss');
      io.emit("receiveTest", nickname, msg, sendingDate);
    });


    socket.on('entry', function(channelId, nickname){

      socket.join(channelId);

      socket.emit("entryok", `${nickname} 대화명으로 입장했습니다.`);

      socket.to(channelId).emit("entryok",`${nickname}님이 채팅방에 입장했습니다`);

    });


    socket.on('groupMsg',async(msgData)=>{

      // 채팅방내 모든 클라이언트로 보낼 메세지
      var sendMsg = `${msgData.nickname} : ${msgData.message}`

      // 해당 채널에 나를 포함한 모든 사용자에게 메세지 보내기
      io.to(msgData.channelId).emit('receiveGroupMsg', sendMsg);

    });


  });
}