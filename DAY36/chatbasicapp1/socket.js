// socket.io 패키지 참조
const SocketIO = require("socket.io");

//socket.io-redis참조
var redis = require("socket.io-redis");


module.exports = (server)=>{

  // SocketIO(서버소캣이 실행될 백엔드서버 객체,
  // 웹브라우저 클라이언트에 제공될 클라이언트스크립트 socket라이브러리 경로 = http://localhost:3000/socket.io/socket.io.js(Client측 socket.io통신모듈))
  // const io = SocketIO(server, {path:"/socket.io"});  // io > input output을 제어해주는 것

  // CORS 이슈 처리 적용한 io객체 생성
  //CORS 지원 IO객체생성
  const io = SocketIO(server, {
    path: "/socket.io",
    cors: {
      origin: "*",  //  "*" > 모든 도메인,모바일
      methods: ["GET", "POST"],
    },
  });


  //Redis Backplain 연결설정
  // env파일로 관리하기
  io.adapter(
    redis({
      host: "127.0.0.1",
      port: "6379",
      password:"test12345"
    })
  );


  // io.on("이벤트명", 이벤트처리 콜백함수(연결정보));
  // io 서버소캣이 클라이언트와 연결이 완료되면 메시지 ㅅ수발신 기능을 제공
  // 소캣은 반드시 클라이언트와 연결이 된상태에서만 메세지를 주고받을 수 있다.
  // 그래서 io 서버소캣이 connection이벤트가 발생한 스코프(범위) 안에서 각종 메세지 수발신
  // 처리기능을 구현
  // 클라이언트와 서버소캣간 연결이 완료되면 클라이언트/서버연결 정보를 가진 socket이란 객체가 전달된다.
  // io는 서버소캣 자체이고(상위개념) socket은 각각의 클라이언트와 연결된 연결정보 객체이다.
  io.on("connection",async(socket)=>{

    // 서버소캣과 연결된 각각의 클라이언트간 수발신 기능 구현
    // socket.on("서버측 메세지 수신기 이벤트 명(임의적으로 정함)", 이벤트 처리기 콜백함수(데이터));
    socket.on("broadcast", async(msg)=>{
      // io.emit("클라이언트 이벤트수신기명",data)
      // 현재 서버소캣인 io에 연결된 모든 사용자에게 지정한 클라이언트 이벤트 수신기명에 메시지 데이터를 보낸다.
      // io.emit(); : 서버소캣에 연결된 모든 클라이언트 사용자에게 메세지 발송한다.
      io.emit("receiveAll", msg);
    });


    // 테스트용 서버측 이벤트 수신기 정의와 클라이언트 메세지 보내기 샘플
    // 서버측/클라이언트측 이벤트 수신기명과 전달 데이터 수/포맷은 개발자가 정한다.
    socket.on("broadcast", async(msg)=>{
      io.emit("receiveTest",msg);
    });


    // 채팅방 개설 및 채팅방 입장하기 기능 처리
    // 사용자 채팅방 입장사실 클라이언트에 알리기
    socket.on('entry', function(channelId, nickname){

      // socket.join(채팅방고유아이디-문자열(.toString() 메소드로 문자열 전환 가능));
      // socket.join() 동일 채널id가 없으면 해당 채팅방을 만들고 있으면 해당 채널로 접속한다.
      socket.join(channelId);

      // 채널 입장사실 사용자들에게 알려주기 3가지 방법
      // 1. 현재 접속한 사용자에게만 메세지를 보내기
      // socket.emit()
      socket.emit("entryok", `${nickname} 대화명으로 입장했습니다.`);

      // 2. 현재 접속한 채팅방에 현재 접속한 사용자를 제외한 나머지 사용자들에게만 메세지 보내기
      // socket.to(channelId).emit("이벤트수신기명",데이터);
      // 해당 채널에 접속중인 나를 제외한 나머지 사용자에게 메세지를
      socket.to(channelId).emit("entryok",`${nickname}님이 채팅방에 입장했습니다`);

      // 3. 해당 채팅방의 나를 포함한 모든 사용자에게 메세지 보내기
      // io.to(channelId).emit("이벤트수신기명",데이터);
      // io.to(channelId).emit("entryok",`${nickName}님이 채팅방에 입장했습니다`);
    
    });


    socket.on('groupMsg',async(msgData)=>{

      // 채팅방내 모든 클라이언트로 보낼 메세지
      var sendMsg = `${msgData.nickname} : ${msgData.message}`
      // 해당 채널에 나를 포함한 모든 사용자에게 메세지 보내기
      io.to(msgData.channelId).emit('receiveGroupMsg', sendMsg);

    });


  });
}