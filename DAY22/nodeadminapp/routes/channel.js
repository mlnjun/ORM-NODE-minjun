var express = require('express');
var router = express.Router();


// 채팅방 정보 관리 라우팅 기능 제공


/*
-채팅방 정보 리스트 페이지 호출
호출 주소 : http://localhost:3001/channel/list
GET
*/
router.get('/list',async(req,res)=>{

  // 채팅방 정보 데이터


  res.render('channel/list',{channel});
});


/*
-채팅방 정보 생성 페이지 호출
호출 주소 : http://localhost:3001/channel/create
GET
*/
router.get('/create',function(req,res){
  res.render('channel/create');
});


/*
-채팅방 정보 생성 페이지 채팅방 데이터 요청과 호출
호출 주소 : http://localhost:3001/channel/create
POST
*/
router.post('/create',function(req,res){
  // 생성 채팅방 데이터 받기
  chatRoomTitle = req.body.chTitle;
  chatRoomMembers = req.body.chMembers;

  // 생성 채팅방 데이터 DB 저장


  res.redirect('/channel/list');
});


/*
-채팅방 정보 수정 페이지 호출
호출 주소 : http://localhost:3001/channel/modify
GET
*/
router.get('/modify/:chId',async(req,res)=>{

  // 파라미터 방식으로 채팅방 ID 받기
  let chId = req.params.chId;


  // 채널 ID정보로 DB에서 해당 데이터 찾기


  // 임시 데이터
  var channel = {
    community_id:1,
    category_code:1,
    channel_name:"채팅방1",
    user_limit:2,
    channel_desc:"채팅방1 입니다.",
    channel_state_code:1,
    reg_date:Date.now(),
    reg_member_id:"A"
  }


  res.render('channel/modify', {channel});
});



/*
-채팅방 정보 수정 페이지 채팅방 정보 수정 데이터 요청과 응답 메소드
호출 주소 : http://localhost:3001/channel/modify
POST
*/
router.post('/modify/:chId',async(req,res)=>{
  // 수정할 채팅방 데이터 받기



  // DB 채팅방 데이터 수정하기



  res.redirect('/channel/list');
});


/*
-채팅방 정보 리스트 삭제 요청과 호출 메소드
호출 주소 : http://localhost:3001/channel/delete
GET
*/
router.get('/delete',function(req,res){
  // chatRoomId 받고 DB에서 찾아서 삭제


  res.redirect('/channel/list');
});



module.exports = router;
