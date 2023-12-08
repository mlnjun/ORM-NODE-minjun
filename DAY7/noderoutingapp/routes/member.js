// 인라인 자바스크립트 주석
/* 
기능 : 각종 회원 정보 처리 요청과 응답 처리 라우팅 파일
약관페이지 요청 응답, 회원가입 웹페이지 요청과 응답처리
기본 라우팅 주소 : http://localhost:3000/member/~
사용자가 링크클릭ㅇㅇ이나 url을 직접 입력한 주소가 http://localhost:3000/member/~이면
노드앱의 app.js의 참조된 라우터 파일중 해당 /member/~기본주소를 관리라는 해당 라우터 파일을 먼저 찾고
그다음에 사용자가 요청한 /member/entry entry라우팅 메소드 주소로 바인딩된 라우팅 메소드를 찾아
요청과 응답을 해당 라우팅 메소드에서 처리해준다.
*/

var express = require('express');
var router = express.Router();


// 사용자가 요청하는 방식(get,post)과 주소(/join)가 동일한 라우팅 메소드를 찾습니다.
/*
기능 : 사용자 가입 약관 웹페이지에 대한 요청과 응답처리 라우팅 메소드
요청방식 : GET
요청주소 : http://localhost:3000/member/join
응답결과 : 회원약관 웹페이지 전달(join.ejs)
*/
router.get('/join', function(req, res){
  res.render('member/join');
})


/*
기능 : 신규회원 직접 가입 웹페이지(가입용) 요청과 응답 처리 라우팅 메소드
요청방식 : GET
요청 주소 : http://localhost:3000/member/entry
응답 결과 : 회원가입 웹페이지
*/
router.get('/entry', function(req, res){
  res.render('member/entry');
})


/*
기능 : 사용자가 입력한 회원정보 DB처리하고 로그인 페이지로 이동시키는 요청과 응답 처리 라우팅 메소드
요청 방식 : POST
요청 주소 : http://localhost:3000/member/entry

*/
router.post('/entry', function(req, res){
  
  var email = req.body.Email;
  var password = req.body.Password;

  var member = {
    email,
    password
  }

  res.redirect('/auth/login');  // redirect에는 url이 들어가야한다.(경로X)(같은 도메인주소 사용시 생략가능)
})


module.exports = router;