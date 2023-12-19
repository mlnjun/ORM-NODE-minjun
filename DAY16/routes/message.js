var express = require('express');
var router = express.Router();


// 채팅 메시지 이력 정보관리 라우팅 기능 제공


/*
-채팅 메시지 리스트 페이지 호출
호출 주소 : http://localhost:3001/message/list
GET
*/
router.get('/list',function(req,res){

  var channel_msg = [
    {
      channel_msg_id:1,
      channel_id:1,
      nick_name:"A",
      msg_type_code:"1",
      connection_id:"qwe123",
      channel_msg:"메시지 내용1",
      ip_address:"111.111.111.111",
      msg_state_code:"1",
      msgDate:Date.now(),
    },
    {
      channel_msg_id:2,
      channel_id:2,
      nick_name:"B",
      msg_type_code:"2",
      connection_id:"asd123",
      channel_msg:"메시지 내용2",
      ip_address:"222.111.111.111",
      msg_state_code:"2",
      msgDate:Date.now(),
    },
    {
      channel_msg_id:3,
      channel_id:1,
      nick_name:"C",
      msg_type_code:"1",
      connection_id:"zxc123",
      channel_msg:"메시지 내용3",
      ip_address:"123.111.111.111",
      msg_state_code:"1",
      msgDate:Date.now(),
    }
  ]

  res.render('message/list',{channel_msg});
});


/*
-채팅 메시지 생성 페이지 호출
호출 주소 : http://localhost:3001/message/create
GET
*/
router.get('/create',function(req,res){
  res.render('message/create');
});


/*
-채팅 메시지 생성 페이지 메시지 데이터 요청과 응답 메소드
호출 주소 : http://localhost:3001/message/create
POST
*/
router.post('/create',function(req,res){
  // chatchannel_msg, chatUserName, chatDate chatId


  res.redirect('/message/list');
});


/*
-채팅 메시지 수정 페이지 호출
호출 주소 : http://localhost:3001/message/modify
GET
*/
router.get('/modify/:msgId',function(req,res){

  // var msgId = req.params.msgId

  var channel_msg = {
    channel_msg_id:1,
    channel_id:1,
    nick_name:"A",
    msg_type_code:"1",
    connection_id:"qwe123",
    channel_msg:"메시지 내용1",
    ip_address:"111.111.111.111",
    msg_state_code:"1",
    msgDate:Date.now(),
  }


  res.render('message/modify', {channel_msg});
});


/*
-채팅 메시지 수정 페이지 채팅 메시지 수정 데이터 요청과 응답 메소드
호출 주소 : http://localhost:3001/message/modify
POST
*/
router.post('/modify/:msgId',function(req,res){
  // let msgUser = req.body.msgUser
  // let msgContent = req.body.msgContent


  // DB처리

  res.redirect('/message/list');
});


/*
-채팅 메시지 삭제 요청과 응답 메소드
호출 주소 : http://localhost:3001/message/delete
GET
*/
router.get('/delete',function(req,res){
  // chatId


  res.redirect('/message/list');
});





module.exports = router;
