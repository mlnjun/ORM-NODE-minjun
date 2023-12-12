var express = require('express');
var router = express.Router();


// 채팅 메시지 이력 정보관리 라우팅 기능 제공


/*
-채팅 메시지 리스트 페이지 호출
호출 주소 : http://localhost:3001/message/list
GET
*/
router.get('/list',function(req,res){

  var message = [
    {
      msgUser:"A",
      msgContent:"메시지 내용1",
      msgDate:Date.now(),
      msgId:1
    },
    {
      msgUser:"B",
      msgContent:"메시지 내용2",
      msgDate:Date.now(),
      msgId:2
    },
    {
      msgUser:"C",
      msgContent:"메시지 내용3",
      msgDate:Date.now(),
      msgId:3
    }
  ]

  res.render('message/list',{message});
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
  // chatMessage, chatUserName, chatDate chatId


  res.redirect('/message/list');
});


/*
-채팅 메시지 수정 페이지 호출
호출 주소 : http://localhost:3001/message/modify
GET
*/
router.get('/modify/:msgId',function(req,res){

  // var msgId = req.params.msgId

  var message = {
      msgUser:"A",
      msgContent:"메시지 내용1",
      msgDate:Date.now(),
      msgId:1
    }


  res.render('message/modify', {message});
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
