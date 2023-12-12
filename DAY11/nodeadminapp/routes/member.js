var express = require('express');
var router = express.Router();


// 사용자 계정 정보(사용자 사이트에서 가입한 사용자 정보)관리 라우팅 기능 제공


/*
-user 계정 정보 리스트 페이지 호출
호출 주소 : http://localhost:3001/member/list
GET
*/
router.get('/list',function(req,res){

  var userMembers = [
    {
      id:"qwe123",
      password:"qwe123",
      userName:"A"
    },
    {
      id:"asd123",
      password:"asd123",
      userName:"B"
    },
    {
      id:"zxc123",
      password:"zxc123",
      userName:"C"
    }
  ]

  res.render('member/list',{userMembers});
});


/*
-user 계정 생성 페이지 호출
호출 주소 : http://localhost:3001/member/create
GET
*/
router.get('/create',function(req,res){
  res.render('member/create');
});


/*
-user 계정 생성 페이지 신규 계정 데이터 요청과 응답
호출 주소 : http://localhost:3001/member/create
POST
*/
router.post('/create',function(req,res){
  


  res.redirect('/member/list');
});


/*
-user 계정 정보 수정 페이지 호출
호출 주소 : http://localhost:3001/member/modify
GET
*/
router.get('/modify/:userName',function(req,res){

  var userMembers = {
    id:"qwe123",
    password:"qwe123",
    userName:"A"
  }

  res.render('member/modify',{userMembers});
});


/*
-user 계정 정보 수정 페이지 계정 정보 수정 요청과 응답
호출 주소 : http://localhost:3001/member/modify
POST
*/
router.post('/modify',function(req,res){
    


  res.redirect('/member/list');
});


/*
-user 계정 삭제 요청과 응답
호출 주소 : http://localhost:3001/member/delete
GET
*/
router.get('/delete',function(req,res){
  // var userId = req.body.uid


  res.redirect('/member/list');
});


module.exports = router;
