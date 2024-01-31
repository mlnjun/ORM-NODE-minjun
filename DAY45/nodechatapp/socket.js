//socket.io 팩키지 참조
const SocketIO = require("socket.io");

//socket.io-redis참조
var redis = require("socket.io-redis");

//socket.js모듈 기능정의
module.exports =(server)=>{
  const io = SocketIO(server, {
    path: "/socket.io",
    cors: {
      origin: "*",  //  "*" > 모든 도메인,모바일
      methods: ["GET", "POST"],
    },
  });


  io.adapter(
    redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      // password:process.env.REDIS_PW
    })
  );



  io.on("connection", async (socket)=>{

    console.log(socket);

  });
}