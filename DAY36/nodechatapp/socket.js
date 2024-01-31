// socket.io 패키지 참조
const SocketIO = require("socket.io");

// moment 패키지 참조
const moment = require('moment');

var jwt = require('jsonwebtoken');

// DB객체 참조하기
var db = require('./models/index');

var redis = require('socket.io-redis');



module.exports = (server)=>{

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
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      // password:process.env.REDIS_PW
    })
  );

  io.on("connection",async(socket)=>{

    //소켓Req객체
    const req = socket.request;

    //접속 클라이언트 IP주소
    const userIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;//사용자IP

    // 현재 연결되는 사용자들 기반을 사용할 전역변수 정의 사용
    const socketID = socket.id;  // 현재 연결 사용자의 고유한 ConnectionId값 조회

    
    // 시스템 소켓 이벤트 재 정의하기

    // 웹브라우저와 서버소켓이 끊어질 떄마다 자동으로 발생하는 이벤트
    // 사용자가 웹브라우저, 탭을 닫거나 일시적 네트워크 장애로 웹소켓이 끊겼을 때
    // 서버소켓에서 자동소켓 끊김 감지 기능제공
    socket.on('disconnect', async()=>{

      // 개발자 정의 현재 접속자 연결 끊김 처리함수
      await UserConnectionOut(socket.interval);

      // 소켓 끊김시 서버측 자원정리 기능 제공
      clearInterval(socket.interval);

    });

    // 소켓 통신 에러 감지 이벤트 핸들러
    socket.on('error', async()=>{
      console.log("서버 소켓 에러발생 이벤트 감지기")
    });


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

    // 채팅방 입장처리
    socket.on("entryChannel", async(channel)=>{

      try{

        var currentUser = await jwt.verify(channel.token, process.env.JWT_SECRET);

        // step1 : 채널유형별 채널정보 생성 또는 조회하기
        // 일대일 채널은 생성하고 그룹채널은 조회
        var channelData = {};

        if(channel.channelType == 1){

          // 일대일 채널의 채널명 생성하기 : 회원 번호가 작은게 앞으로 구성된 문자열 생성 ex) 1-100
          var channelName = channel.targetMemberId < currentUser.member_id 
            ? `${channel.targetMemberId}-${currentUser.member_id}`
            : `${currentUser.member_id}-${channel.targetMemberId}`;

          // 일대일 채널 존재여부 체크 후 없으면 생성
          channelData = await db.Channel.findOne({
            where:{channel_name:channelName, category_code:1}
          });

          // 동일한 일대일 채널정보가 존재하지 않으면 일대일 채널 생성하기
          if(channelData == null){
            var channelInfo = {
              cummunity_id:1,
              category_code:channel.channelType,
              channel_name:channelName,
              channel_img_path:"",
              user_limit:2,
              channel_state_code:1,
              reg_date:Date.now(),
              reg_member_id:currentUser.member_id
            };


            // 신규 일대일 채널 생성
            var registedChannel = await db.Channel.create(channelInfo);

            // 일대일 채널 구성원 정보 등록
            var currentMember = {
              channel_id:registedChannel.channel_id,
              member_id:currentUser.member_id,
              nickname:currentUser.name,
              member_type_code:1,
              active_state_code:0,
              connection_id:"",
              ip_address:"",
              edit_date:Date.now(),
              edit_member_id:currentUser.member_id
            };

            await db.ChannelMember.create(currentMember);


            var targetMember = {
              channel_id:registedChannel.channel_id,
              member_id:channel.targetMemberId,
              nickname:channel.targetNickname,
              member_type_code:0,
              active_state_code:0,
              connection_id:"",
              ip_address:"",
              edit_date:Date.now(),
              edit_member_id:currentUser.member_id
            }

            await db.ChannelMember.create(targetMember);
          }
        }else{
          // 그룹채널 정보조회
          // 전달된 채널 고유번호로 조회해서 channelData에 할당하면 된다.
        }

        // step2 : 현재 채팅방 접속자 정보 업데이트
        // 현재 접속자의 접속상태와 접속일시 정보 업데이트 처리
        var updateMember = {
          active_state_code:1,
          last_contact_date:Date.now(),
          connection_id:socketID,
          ip_address:userIP
        }

        await db.ChannelMember.update(updateMember, {
          where:{channel_id:channelData.channel_id, member_id:currentUser.member_id}
        });

        // step3 : 채널 조인(채팅방 입장 처리하기)
        socket.join(channelData.channel_id);

        // step4 : 채널 조인결과 메세지 발송
        // 접속자에게 메세지 보냄
        socket.emit("entryok", `${currentUser.name} 대화명으로 입장했습니다.`, currentUser.name, channelData);
        // 접속자를 제외한 사용자에게 입장사실 메세지 보냄
        socket.to(channelData.channel_id).emit("entryok",`${currentUser.name}님이 채팅방에 입장했습니다`, currentUser.name, channelData);

        // 채팅방 입장 로그 기록하기
        await ChattingMsgLogging(
          channelData.channel_id,
          currentUser.member_id,
          currentUser.name,
          1,
          `${currentUser.name}님이 채팅방에 입장했습니다`
        );
      }catch(err){
        socket.emit("entryok", `채널입장 오류발생`, currentUser.name, channelData);
      }

    });

    // 채팅방별 메세지 수발신 처리
    socket.on('channelMsg',async(channelId, member_id, nickname, profile, message)=>{

      var sendDate = moment(Date.now()).format('HH:mm');

      // 해당 채널에 나를 포함한 모든 사용자에게 메세지 보내기
      io.to(channelId).emit('receiveChannelMsg', nickname, profile, message, sendDate);

      // 채팅 이력 로그 기록하기
      await ChattingMsgLogging(channelId, member_id, nickname, 2, message);

    });


    // 채팅 이력 정보 기록처리 함수
    async function ChattingMsgLogging(channel_id, member_id, nickname, msg_type_code, message){

      var msg = {
        channel_id:channel_id,
        member_id:member_id,
        nickname:nickname,
        msg_type_code:msg_type_code,
        connection_id:socketID,
        message:message,
        ip_address:userIP,
        msg_state_code:1,
        msg_date:Date.now(),
      };

      await db.ChannelMsg.create(msg);

    };


    // 사용자 나가기 정보처리
    async function UserConnectionOut(){
      
      // 현재 접속이 끊어지는 사용자의 ConnectionId 기반으로 현재 사용자 정보조회
      var member = await db.ChannelMember.findOne({
        where:{connection_id:socketID}
      });

      if(member != null){
        // 사용자 연결 끊김 정보 수정반영하기
        var updateMember = {
          active_state_code:0,
          last_out_date:Date.now(),
          connection_id:socketID,
          ip_address:userIP
        }
        
        await db.ChannelMember.update(updateMember, {
          where:{connection_id:socketID}
        });

        // 채팅방 퇴장 로그 기록하기
        await ChattingMsgLogging(
          member.channel_id,
          member.member_id,
          member.nickname,
          0,
          `${member.nickname}님이 채팅방을 퇴장했습니다.`
        );
      }
    }

  });
}