//socket.io 팩키지 참조
const SocketIO = require("socket.io");

var redis = require('socket.io-redis');

//socket.js모듈 기능정의
module.exports =(server)=>{

  // CORS 이슈 처리
  const io = SocketIO(server, {
    path: "/socket.io",
    cors: {
      origin: "*",  //  "*" > 모든 도메인,모바일
      methods: ["GET", "POST"],
    },
  });


  // Redis Backplain 연결
  io.adapter(
    redis({
      host: "127.0.0.1",
      port: "6379",
      password: "test12345"
    })
  );


  io.on("connection", async (socket)=>{

    

  });
}