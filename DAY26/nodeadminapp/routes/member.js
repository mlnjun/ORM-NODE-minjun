var express = require('express');
var router = express.Router();


// 사용자 계정 정보(사용자 사이트에서 가입한 사용자 정보)관리 라우팅 기능 제공


/*
-user 계정 정보 리스트 페이지 호출
호출 주소 : http://localhost:3001/member/list
GET
*/
router.get('/list',function(req,res){

  var member = [
    {
      member_id:1,
      email:"qwe123@gmail.com",
      member_password:"qwe123",
      name:"A",
      telephone:"010-9999-9999",
      birth_date:"2000-01-01",
      entry_type_code:1,
      use_state_code:1,
      reg_member_id:1,
      reg_date:Date.now()
    },
    {
      member_id:2,
      email:"asd123@gmail.com",
      member_password:"asd123",
      name:"B",
      telephone:"010-8888-8888",
      birth_date:"2000-01-01",
      entry_type_code:2,
      use_state_code:2,
      reg_member_id:2,
      reg_date:Date.now()
    },
    {
      member_id:3,
      email:"zxc123@gmail.com",
      member_password:"zxc123",
      name:"C",
      telephone:"010-7777-7777",
      birth_date:"2000-01-01",
      entry_type_code:2,
      use_state_code:1,
      reg_member_id:3,
      reg_date:Date.now()
    },
  ]

  res.render('member/list',{member});
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
router.get('/modify/:mid',function(req,res){

  var member = {
    member_id:1,
    email:"qwe123@gmail.com",
    member_password:"qwe123",
    name:"A",
    telephone:"010-9999-9999",
    birth_date:"2000-01-01",
    entry_type_code:1,
    use_state_code:1,
    reg_member_id:1,
    reg_date:Date.now()
  }

  res.render('member/modify',{member});
});


/*
-user 계정 정보 수정 페이지 계정 정보 수정 요청과 응답
호출 주소 : http://localhost:3001/member/modify
POST
*/
router.post('/modify/:mid',function(req,res){
    


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
