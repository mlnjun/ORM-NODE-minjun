// auth.js 라우터 파일은 회원 인증과 관련된 모든 사용자 요청과 응답을 처리합니다.
// 모든 라우터 파일은 기본 라우팅 주소체계를 가집니다.
// http://localhost:3000/ 라우터파일의 기본주소/라우팅메소드의 주소
// http://localhos:3000/auth+a/~ 라는 기본주소로 해당 라우터 파일내 모든 
// 라우팅 메소드는 기본주소를 갖는다.(파일명과 다르게 가능)

var express = require('express');
var router = express.Router();


// 기능 : 로그인 웹 페이지 사용자 요청과 응답처리 라우팅 메소드
// https://www.musinsa.com/auth/login
// 호출방식 : get
router.get('/login', function(req, res){
  res.render('auth/login');
})


// 기능 : 로그인 웹페이지에서 사용자가 입력한 메일주소/암호를 받아 로그인 처리 요청과 응답처리 라우팅 메소드
// 호출 주소 : https://www.musinsa.com/auth/login
// 호출 방식 : post
router.post('/login', function(req, res){
  
  // step1: 사용자 로그인 페이지에서 사용자 입력한 메일주소와 암호값을 추출합니다.
  // 사용자가 입력한 값들은 웹브라우저를 통해 전달되기 때문에 req(HttpRequest객체)를 통해 사용자가 입력한 값을 추출합니다.
  var email = req.body.email;
  var password = req.body.password;


  // step2 : 모델을 이용해 동일한 메일주소와 암호가 있는지 체크한다.



  // step3 : 정상적인 사용자 메일/암호인경우 메인페이지로 사용자 웹페이지 이동시켜준다.
  // res HttpResponse객체의 redirct 메소드는 지정된 url주소 체계로 사용자 웹페이지를 이동시켜준다.
  // res.redirect('http://www.naver.com');
  res.redirect('/main');  // = http://naver.com/main 도메인 생략되어있다.
});


// 로그아웃 요청 및 응답처리 라우팅 메소드
// http://localhost:3000/auth/logout
router.get('/logout', function(req, res){
  // step1 : 로그아웃 처리
  // step2 : 로그아웃 후 이동할 페이지 지정
  res.render('/main')
})





module.exports = router;