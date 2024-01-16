//회원 정보 관리 RESTful API 라우팅 기능 제공
// http://localhost:3000/api/member

var express = require('express');
var router = express.Router();

var db = require('../models');

// 단방향 암호화를 위한 bcrypt 패키지 참조 (비밀번호와 같은 민감한 정보를 안전하게 저장)
const bcrypt = require('bcryptjs');

// 양방향 암호화 및 복호화를 위한 mysql-aes 패키지 참조
const AES = require('mysql-aes');

// jsonwebtoken패키지 참조
const jwt = require('jsonwebtoken');

// 토큰 인증 미들웨어 참조
var {tokenAuthChecking} = require('./apiMiddleware');


router.post('/login', async function (req, res, next) {
  var apiResult = {
    code:400,
    data:null,
    msg:""
};

try{
  var email = req.body.email;
  var password = req.body.password;

  var resultMsg = "";
  
  // step1 : 로그인(인증)-동일 메일주소 여부 체크
  var member = await db.Member.findOne({ where:{ email:email } });
  

  if(member == null){
    resultMsg = "NotExistEmail";

    apiResult.code = 400;  // 서버에 없는 자원 요청 오류코드
    apiResult.data = null;
    apiResult.msg = resultMsg;

  }else{
    // step2: 단방향 암호화 기반 동일암호 일치여부 체크
    // 단방향 암호화 해시 알고리즘 암호 체크
    var compareResult = await bcrypt.compare(password, member.member_password);

    
    if(compareResult){
      resultMsg = "Ok";
      
      member.member_password = "";
      member.telephone = AES.decrypt(member.telephone, process.env.MYSQL_AES_KEY);

      // step3 : 인증된 사용자의 기본정보 JWT토큰 생성 발급
      // step3.1 : JWT토큰에 담을 사용자 정보 생성
      //JWT인증 사용자 정보 토큰 값 구조 정의 및 데이터 세팅
      var memberTokenData = {
        member_id:member.member_id,  // 구분되는 고유한 PK가 핵심
        email:member.email,
        name:member.name,
        profile_img_path:member.profile_img_path,
        telephone:member.telephone,
        etc:"기타정보"
      }

      var token = await jwt.sign(memberTokenData, process.env.JWT_KEY, {expiresIn:'24h', issuer:'company'});

      apiResult.code = 200;
      apiResult.data = token;
      apiResult.msg = resultMsg;
    }else{
      resultMsg = "NotCorrectPassword";

      apiResult.code = 500;
      apiResult.data = null;
      apiResult.msg = resultMsg;
    }
  }


}catch(err){
  console.log('서버에러발생-/api/member/entry',err.message);

  apiResult.code = 500;
  apiResult.data = null;
  apiResult.msg = "Failed";
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


// 회원 정보 관리 RESTful API 라우팅 기능 제공
// http://localhost:3000/api/member/all
router.get('/all',async(req, res)=>{
  res.json(member);
});


// 계정 생성
// http://localhost:3000/api/member/create
router.post('/create',async(req,res)=>{

  let newMember = req.body;


  member.push(newMember);


  res.json(member);

})


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

module.exports = router;
