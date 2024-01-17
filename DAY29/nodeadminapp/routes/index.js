var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs');

// 로그인 여부 체크 사용자 권한 미들웨어 참조하기
var {isLoggedIn, isNotLoggedIn} = require('./sessionMiddleware');

var db = require('../models/index');



/* 
기능 : 관리자 웹사이트 메인페이지 요청과 응답처리 라우팅 메소드
호출 주소 : http://localhost:3000/
*/
router.get('/', isLoggedIn, async(req, res, next)=>{

  // 현재 로그인한 사용자 세션 정보 추출하기
  // var admin_id = req.session.loginUser.admin_id;

  // console.log(admin_id);

  res.render('index');
});


/* 
기능 : 관리자 웹사이트 로그인 웹페이지 요청과 응답처리 라우팅 메 v소드
호출 주소 : http://localhost:3000/
*/
router.get('/login', isNotLoggedIn, async(req, res, next)=>{
  res.render('login',{ layout:false, resultMsg:"" });
});


/* 
기능 : 관리자 웹사이트 로그인 처리 라우팅 메소드
호출 주소 : http://localhost:3000/
*/
router.post('/login', async(req, res, next)=>{
  // step1 : 사용자 입력 아이디/암호 추출하기
  var admin_id = req.body.id;
  var admin_password = req.body.password;

  // step2 : 동일한 아이디 사용자 정보조회하기
  var member = await db.Admin.findOne({ where : { admin_id:admin_id } });

  var resultMsg = "";


  if(!member){
    // 아이디 불일치
    resultMsg = "동일한 아이디가 존재하지 않습니다.";

    res.render('login',{ layout:false, resultMsg });
  }else{
    // 암호화된 사용자 암호 체크하기
    // bcrypt를 이용한 암호체크: bcrypt.compare('사용자가 입력한 암호', 'db에 저장된 암호');
    var passwordResult = await bcrypt.compare(admin_password, member.admin_password);


    if(passwordResult){
      // step4.0: 아이디/암호가 일치하는 사용자인경우 해당 사용자의 주요정보를 세션에 저장한다.

      // 서버에 메로리 공간에 저장할 로그인한 현재 사용자의 세션정보 구조 및 데이터 바인딩
      var sessionLoginData = {
        admin_member_id:member.admin_member_id,
        company_code:member.company_code,
        admin_id:member.admin_id,
        admin_name:member.admin_name
      };

      // req.session속성에 동적속성으로 loginUser라는 속성을 생성하고 값으로 세션 JSON값을 저장한다.
      req.session.loginUser = sessionLoginData;

      // 관리자 로그인 여부 세션 속성 추가하기
      req.session.isLogined = true;

      // 반드시 req.session.save() 메소드를 호출해서 동적 속성에 저장된 신규 속성을 저장한다.
      // save() 호출과 동시에 쿠키파일이 서버에서 생성되고 생성된 쿠키파일이 현재 사용자 웹브라우저에 전달되어 저장된다.
      // 저장된 쿠키파일은 이후 해당 사이트 요청이 있을때마다 무조건 전달된다.
      // 전달된 쿠키정보를 이용해 서버메모리상의 세션정보를 이용해 로그인한 사용자정보를 추출한다. 
      req.session.save(function(){
        // 세션으로 다 이동하면 실행됨
        // 로그인 성공
        res.redirect('/');
      });

    }else{

      // 비밀번호 불일치
      resultMsg = "해당 아이디의 비밀번호와 일치하지 않습니다.";

      res.render('login',{ layout:false, resultMsg });

    }
  }
});


// 사용자 로그아웃 처리 라우팅 메소드
// http://localhost:3001/logout
router.get('/logout', isLoggedIn, async(req, res, next)=>{
  
  // passport 방식
  // req.logout(function(err){
  //   // 로그아웃하고 관리자 로그인 페이지로 이동
  //   req.session.destroy();
  //   res.redirect('/login');
  // });

  res.redirect('/login');
});




module.exports = router;
