//회원 정보 관리 RESTful API 라우팅 기능 제공
// http://localhost:3000/api/member

var express = require('express');
var router = express.Router();

var db = require('../models');

var moment = require('moment');

// 단방향 암호화를 위한 bcrypt 패키지 참조 (비밀번호와 같은 민감한 정보를 안전하게 저장)
const bcrypt = require('bcryptjs');

// 양방향 암호화 및 복호화를 위한 mysql-aes 패키지 참조
const AES = require('mysql-aes');

// jsonwebtoken패키지 참조
const jwt = require('jsonwebtoken');

// 토큰 인증 미들웨어 참조
var {tokenAuthChecking} = require('./apiMiddleware');


// 사용자 로그인 인증 토큰 전송 라우팅 메소드
// http://localhost:3000/api/member/login
router.post('/login', async (req, res, next)=>{
  var apiResult = {
    code:400,
    data:null,
    msg:""
  };

  try{
    // 입력 값 받기
    var email = req.body.email;
    var password = req.body.password;

    // 입력 email 계정 DB에서 찾기
    var loginData = await db.Member.findOne({where:{email:email}});
    
    // 입력 email DB에서 존재하는 계정인지 확인
    if(loginData == undefined){
      // 해당 계정 존재하지않음
      apiResult.code = 400;
      apiResult.data = null;
      apiResult.msg = "해당 이메일의 계정은 존재하지 않습니다.";
    }else{
      // 해당 email계정 존재

      // 입력 password 해당 email 계정의 password와 일치 비교
      var checkPW = await bcrypt.compare(password, loginData.member_password); 

      if(!checkPW){
        // 비밀번호 틀림
        apiResult.code = 400;
        apiResult.data = null;
        apiResult.msg = "해당 이메일의 패스워드가 아닙니다.";
      }else{
        // 로그인 성공 로직

        // 토큰에 담을 해당 계정 데이터 객체
        var tokenData = {
          member_id:loginData.member_id,
          email:loginData.email,
          name:loginData.name
        }

        // 데이터 토큰화
        var token = await jwt.sign(tokenData, process.env.JWT_KEY,{expiresIn:'24h', issuer:'kmj'});

        apiResult.code = 200;
        apiResult.data = token;
        apiResult.msg = "로그인 성공";
      }

    }
  }catch(err){
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "서버 에러";
  }

  res.json(apiResult);
});


// 사용자 회원가입 라우팅 메소드
// http://localhost:3000/api/member/entry
router.post('/entry', async(req,res,next)=>{
  var apiResult = {
    code:200,
    data:null,
    msg:""
  }

  try{
    // 사용자 입력 값 받기
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    var telephone = req.body.telephone;
    var birth_date = req.body.birth_date;

    if(!(email && password && name && telephone && birth_date)){
      // 일부데이터 넘어오지 않음

      apiResult.code = 400;
      apiResult.data = null;
      apiResult.msg = "가입 정보가 정상적으로 전송되지 않았습니다.";
    }else{
      // 정상 진행

      // 비밀번호 단방향 암호화
      var encryptedPW = await bcrypt.hash(password, 12);
    
      // 전화번호, 생년월일 양방향 암호화
      var encryptedPhone = await AES.encrypt(telephone, process.env.MYSQL_AES_KEY);
      var encryptedBirth = await AES.encrypt(birth_date, process.env.MYSQL_AES_KEY);
    
      // 사용자 계정 정보 객체
      var memberData = {
        email,
        member_password:encryptedPW,
        name,
        telephone:encryptedPhone,
        birth_date:encryptedBirth,
        entry_type_code:1,
        use_state_code:1,
        reg_date:Date.now(),
        reg_member_id:1  // 임시 값
      }
    
      // 사용자 입력 값 DB에 넣기
      var member = await db.Member.create(memberData);
    
      apiResult.code = 200;
      apiResult.data = member;
      apiResult.msg = "가입 성공";
    }
  
  }catch(err){
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "서버 에러";
  }

  res.json(apiResult);
});


router.post('/find', async (req, res) => {
  var apiResult = {
    code: 200,
    data: null,
    result: '',
  };

  try {
    const email = req.body.email;

    // 해당 이메일 계정 찾기
    const member = await db.Member.findOne({ where: { email } });

    var resultMsg = '';

    if (member == null) {
      resultMsg = '동일한 메일주소가 존재하지 않습니다.';
      apiResult.code = 400;
      apiResult.data = null;
      apiResult.result = resultMsg;
    } else {
      var tokenData = {
        member_id:member.member_id,
        email:member.email,
        name:member.name
      };

      var token = await jwt.sign(tokenData ,process.env.JWT_KEY, {expiresIn:'20m', issuer:'k-triad'});

      resultMsg = "암호 찾기 완료.";
      apiResult.code = 200;
      apiResult.data = token;
      apiResult.result = resultMsg;
    }
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = '서버에러발생 관리자에게 문의하세요.';
  }
  res.json(apiResult);
});


// 미완
// 회원 정보 관리 RESTful API 라우팅 기능 제공
// http://localhost:3000/api/member/all
router.get('/all',async(req, res)=>{
  res.json(member);
});


// 미완
// 계정 생성 
// http://localhost:3000/api/member/create
router.post('/create',async(req,res)=>{

  let newMember = req.body;


  member.push(newMember);


  res.json(member);

})


// 미완
// 계정 정보 수정
// http://localhost:3000/api/member/modify/1
router.post('/modify/:uid',async(req,res)=>{
  
  try{
    // 입력 받기
    var member_id = req.params.uid;
    var email = req.body.email;
    var member_password = req.body.member_password;
    var name = req.body.name;
    var telephone = req.body.telephone;
    var birth_date = req.body.birth_date;
    var entry_type_code = req.body.entry_type_code;
    var use_state_code = req.body.use_state_code
    var reg_member_id = req.body.reg_member_id
  
  
    // 받은 입력값 객체
    let modifyMember = {
      member_id,
      email,
      member_password,
      name,
      telephone,
      birth_date,
      entry_type_code,
      use_state_code,
      reg_member_id
    }
  


    // 
    let index
  
  
    for(let i = 0; i<channel.length; i++){
      if(channel[i].community_id == community_id){
        channel[i] = modifyChdata;
        // console.log(channel[i])

        apiResult.code = 200;
        apiResult.data = channel;
        apiResult.result = "OK";

        res.json(apiResult);
        index = i;
        break;
      }
    }
  
  
  
    if(channel[index] == undefined){
      res.send("해당 계정은 존재하지 않습니다.");
    }

  }catch(err){
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = "Failed";
  }

})


// 미완
// 계정 삭제
// http://localhost:3000/api/member/delete
router.post('/delete',async(req,res)=>{
  let userid = req.body.userid;
  let upassword = req.body.upassword;

  
  let index

  for(let i = 0; i<member.length; i++){
    if((member[i].userid == userid) && (member[i].upassword == upassword)){
      member.splice(i, 1);
      // console.log(channelData[i]);j
      res.json(member);
      index = i;
      break;
    }
  }



  if(member[index] == undefined){
    res.send("해당 계정은 존재하지 않습니다.");
  }
});


// 미완
// 단일 회원정보 데이터 조회 
// http://localhost:3000/api/member/cid
router.get('/mid/:userid',async(req,res)=>{
  let userid = req.params.userid;


  for(let i = 0; i<member.length; i++){
    if(member[i].userid == userid){
      res.json(member[i]);
      break;
    }
  }
  
})


// email로 단일 회원정보 데이터 조회
// http://localhost:3000/api/member/invite
router.post('/invite', async (req, res, next)=> {
  const apiResult = { 
    code: 200,
    data: null,
    result: 'ok',
  };

  try {
    const email = req.body.email;

    const inviteMember = await db.Member.findOne({
      where: { email },
      attributes: ['member_id', 'email', 'name', 'profile_img_path', 'use_state_code']
    });

    apiResult.code = 200;
    apiResult.data = inviteMember;
    apiResult.result = 'ok';
  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = 'Failed';
  }

  res.json(apiResult);
});


// 사용자 암호 체크 및 암호 변경 기능
// http://localhost:3000/api/member/password/update
// POST
router.post('/password/update', tokenAuthChecking, async (req, res, next) => {
  var resultMsg = {
    code: 200,
    data: '',
    msg: '',
  };

  try {
    // 사용자 암호 받기
    var password = req.body.password;
    var newPassword = req.body.newPassword;

    // 토큰으로 사용자 정보 받기
    var token = req.headers.authorization.split('Bearer ')[1];
    var tokenData = await jwt.verify(token, process.env.JWT_KEY);


    // 토큰으로 받은 사용자 DB에서 찾기
    var userMember = await db.Member.findOne({ where: { member_id: tokenData.member_id } });

    var PWCompare = await bcrypt.compare(password, userMember.member_password);

    // 암호 틀린 오류
    if (!PWCompare) {
      resultMsg.code = 400;
      resultMsg.data = null;
      resultMsg.msg = '암호가 틀렸습니다.';
    } else {
      // 유저 입력 암호 일치 > 암호 변경

      // 입력받은 새 암호 암호화
      var encryptNewPW = await bcrypt.hash(newPassword, 12);

      // 암호화된 새 암호 DB등록
      var updatedMember = await db.Member.update({member_password:encryptNewPW}, { where: { member_id : tokenData.member_id } });

      // 결과
      resultMsg.code = 200;
      resultMsg.data = updatedMember;
      resultMsg.msg = '암호 변경 성공';
    }
  } catch (err) {
    // 서버에러
    resultMsg.code = 500;
    resultMsg.data = null;
    resultMsg.msg = '서버 에러';
  }

  res.json(resultMsg);
});



module.exports = router;