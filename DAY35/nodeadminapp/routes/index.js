var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs');

//passport 객체 참조
const passport = require('passport');

// 로그인 여부 체크 사용자 권한 미들웨어 참조하기
// var {isLoggedIn, isNotLoggedIn} = require('./sessionMiddleware');
var {isLoggedIn, isNotLoggedIn} = require('./passportMiddleware');

var db = require('../models/index');



/* 
기능 : 관리자 웹사이트 메인페이지 요청과 응답처리 라우팅 메소드
호출 주소 : http://localhost:3000/
*/
router.get('/', isLoggedIn, async(req, res, next)=>{

  // 현재 로그인한 사용자 세션 정보 추출하기

  // case1 : 일반세션 기반 로그인 사용자 정보추출하기
  // var admin_id = req.session.loginUser.admin_id;

  // case2 : 패스포트 세션 기반 로그인 사용자 정보 추출하기
  var admin_id = req.session.passport.user.admin_id;

  // console.log(admin_id);

  res.render('index');
});


/* 
기능 : 관리자 웹사이트 로그인 웹페이지 요청과 응답처리 라우팅 메 v소드
호출 주소 : http://localhost:3000/login
*/
router.get('/login', isNotLoggedIn, async(req, res, next)=>{
  res.render('login',{ layout:false, resultMsg:"" });
});


/* 
기능 : 익스프레스 세션 기반 관리자 웹사이트 로그인 처리 라우팅 메소드
호출 주소 : http://localhost:3000/login
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


/* 
기능 : 패스포트 기반 관리자 웹사이트 로그인 처리 라우팅 메소드
호출 주소 : http://localhost:3000/passportLogin
*/
router.post('/passportLogin', isNotLoggedIn, async(req,res,next)=>{
  // passport기반 로그인 인증처리 메소드 호출하여 passport기반으로 로그인 실시한다.
  //   passport.authenticate('로그인 전략=local', passport 로그인 후 수행되는 콜백함수=done('패스포트실행결과-(정상,에러), 세션데이터, 추가메세지')=>{});
  passport.authenticate('local', (authError, admin, info)=>{

    // 패스포트 인증시 에러가 발생한경우 에러값이 반환됨
    if(authError){
      console.log(authError);
      return next(authError);
    }


    // 로컬전략 파일에서 전달된 관리자 세션 데이터가 전달이 안된경우
    // 동일아이디와 암호가 없는 경우 done()두번째 파라미터의 값이 false로 전달된다.
    // 아이디 암호가 틀린 경우 체크
    if(!admin){
      // flash패키지 설치 필요 : flash패키지는 서버 기반에서 특정페이지 이동시 바로전에 특정 데이터를 전달해주고 싶을 때 사용
      // req.flash('키명', 키값)
      req.flash('loginError', info.message);  // 특정 페이지에서 특정 페이지로 이동하기 전단계에서 값을 전달해주는
      return res.redirect('/login');
    }


    // 정상적으로 passport인증이 완료된 경우
    // req.login('세션으로저장할 사용자데이터, 처리결과 콜백함수(login실행시 발생한 에러값)') : passport기반 정상 인증이 완료되면 passport세션을 생성해주는 기능 제공
    return req.login(admin, (loginError)=>{
      if(loginError){
        console.log(loginError);
        return next(loginError);
      }

      // 정상적으로 세션데이터가 세션에 반영된 경우 처리
      return res.redirect('/');
    });

  })(req,res,next);

})


// 사용자 로그아웃 처리 라우팅 메소드 : 패스포트 전용 로그아웃
// http://localhost:3001/logout
router.get('/logout', isLoggedIn, async(req, res, next)=>{
  
  // passport 방식
  req.logout(function(err){
    // 로그아웃하고 관리자 로그인 페이지로 이동
    req.session.destroy();
    res.redirect('/login');
  });

});




module.exports = router;
