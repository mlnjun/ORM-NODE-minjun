var express = require('express');
var router = express.Router();

// DB객체 참조하기
var db = require('../models/index');

var bcrypt = require('bcryptjs');

/*
우리가 개발하는 2가지 방식
1) 100% 서버측 기술사용(Server side) : MVC 패턴 FORM기반 화면 및 데이터 처리 방식 - NO RESTful 방식 > 관리자 웹사이트
2) 프론트엔드(AJAX)-백엔드(RESTful)기반으로 개발하는 방식 
2.1 - 사용자 웹사이트 프론트엔드(AJAX)-백엔드(RESTful)기반 개발방식-풀스택

2.2 - 사용자 웹사이트도 100% 서버사이드 기술로 개발이 가능
*/

/* 임시메인 */
router.get('/', function(req, res, next) {
  res.render('channel/chat', {layout:'baseLayout'});
  // res.render('channel/chat', {layout:false});
});


/* 회원가입 웹페이지 요청과 응답 */
router.get('/entry', function(req, res, next) {
  res.render('entry');
});


/* 회원가입 웹페이지 요청과 응답 */
router.post('/entry', async(req, res, next) => {

  // step1 : 회원가입 페이지에서 사용자가 입력한 외원정보 추출
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;


  // 사용자 암호 단방향 암호화 적용
  var ecryptedPassword = await bcrypt.hash(password, 12);

  // DB신규 회원등록처리
  var member = {
    email,
    member_password:ecryptedPassword,
    name,
    profile_img_path:"",
    telephone:"",
    entry_type_code:0,
    use_state_code:1,
    birth_date:111111,
    reg_date:Date.now(),
    reg_member_id:0
  };

  await db.Member.create(member);



  // 등록완료시 로그인 페이지로 이동시키기
  res.redirect('/login');
});


/* 로그인 웹페이지 요청과 응답 */
router.get('/login', function(req, res, next) {
  res.render('login.ejs');
});


/* 로그인 웹페이지 요청과 응답 */
router.post('/login', async(req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;

  var member = await db.Member.findOne({ where:{ email } });

  var resultMsg = "";


  if(!member){
    // email 틀림
    resultMsg = "동일한 메일주소가 존재하지 않습니다.";
    res.render('login', {resultMsg});

  }else{

    var result = await bcrypt.compare(password, member.member_password);

    if(result){
      res.redirect('/');
    }else{
      resultMsg = "사용자 암호가 일치하지 않습니다.";
      res.render('login', {resultMsg})

    }
  }
});


/* 암호찾기 웹페이지 요청과 응답 */
router.get('/find', function(req, res, next) {
  res.render('find.ejs');
});


/* 암호찾기 웹페이지 요청과 응답 */
router.post('/find', function(req, res, next) {
  res.render('/find',{email:"", result:"OK"});
});




module.exports = router;
