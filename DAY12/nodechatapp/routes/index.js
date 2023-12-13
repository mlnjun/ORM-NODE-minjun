var express = require('express');
var router = express.Router();

// 공통기능 제공 (로그인, 회원가입, 암호찾기)


/*
-로그인 웹페이지 요청 및 응답
호출 주소 : http://localhost:3000/login
GET
*/
router.get('/login',async(req, res)=>{
  res.render('login');
});


/*
-로그인 처리 요청 및 응답, 로그인 완료 후 채팅 페이지 이동 처리
호출 주소 : http://localhost:3000/login
POST
*/
router.post('/login',async(req,res)=>{
  // 사용자 입력 id, pw 입력 받기
  let uid = req.body.uid;
  let upassword = req.body.upassword;


  // ID PW를 DB에서 찾기


  // 로그인 일치하는 ID,PW 있을시 채팅 페이지 이동처리
  res.redirect('/chat');

});


/*
-회원가입 웹페이지 요청 및 응답
호출 주소 : http://localhost:3000/entry
GET
*/
router.get('/entry',async(req, res)=>{
  res.render('entry');
});


/*
-회원가입 처리 요청 및 응답,회원가입 완료 후 로그인 페이지 이동처리
호출 주소 : http://localhost:3000/entry
POST
*/
router.post('/entry',async(req, res)=>{
  
// 회원가입 정보 입력 받기
// uid, upassword, userName, age, phone
let [uid, upassword, userName, age, phone, email] = [
  req.body.uid,
  req.body.upassword,
  req.body.userName,
  req.body.age,
  req.body.phone,
  req.body.email
];


// 데이터 json객체로 만들기
let userMember = {
  uid,
  upassword,
  userName,
  age,
  phone,
  email
}


// 받은 회원가입 정보 DB에 추가하기


// 로그인 페이지 이동 처리
res.redirect('/login');
});



/*
-암호 찾기 웹페이지 요청 및 응답
호출 주소 : http://localhost:3000/find
GET
*/
router.get('/find',async(req, res)=>{
  res.render('find');
});


/*
-회원가입 처리 요청 및 응답,회원가입 완료 후 로그인 페이지 이동처리
호출 주소 : http://localhost:3000/find
POST
*/
router.post('/find',async(req, res)=>{
  
// 사용자 계정의 email 받기
let email = req.body.email;


// 받은 email DB에서 유무 체크


// DB에서 해당 email의 계정 PW 데이터 전송


// 로그인 페이지 이동 처리
res.redirect('/login');
});









module.exports = router;