var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs');

var db = require('../models/index');

/* 
기능 : 관리자 웹사이트 메인페이지 요청과 응답처리 라우팅 메소드
호출 주소 : http://localhost:3000/
*/
router.get('/', async(req, res, next)=>{
  res.render('index');
});


/* 
기능 : 관리자 웹사이트 로그인 웹페이지 요청과 응답처리 라우팅 메소드
호출 주소 : http://localhost:3000/
*/
router.get('/login', async(req, res, next)=>{
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

      // 로그인 성공
      res.redirect('/');

    }else{

      // 비밀번호 불일치
      resultMsg = "해당 아이디의 비밀번호와 일치하지 않습니다.";

      res.render('login',{ layout:false, resultMsg });

    }
  }

});





module.exports = router;
