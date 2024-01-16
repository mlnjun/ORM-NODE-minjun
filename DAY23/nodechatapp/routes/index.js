var express = require('express');
var router = express.Router();

// 공통기능 제공 (로그인, 회원가입, 암호찾기)


/*
-로그인 웹페이지 요청 및 응답
호출 주소 : http://localhost:3000/login
GET
*/
router.get('/login',async(req, res)=>{
  
  res.render('login',{upassword:""});
});


/*
-로그인 처리 요청 및 응답, 로그인 완료 후 채팅 페이지 이동 처리
호출 주소 : http://localhost:3000/login
POST
*/
router.post('/login',async(req,res)=>{
  // 사용자 입력 id, pw 입력 받기
  let email = req.body.uid;
  let member_password = req.body.upassword;


  // ID PW를 DB에서 찾기
  let foundEmail = member.find(function(e){
    return email === e.email
  });

  let foundPassword = member.find(function(pw){
    return member_password === pw.member_password
  });


  if(foundEmail !== undefined &&  foundPassword !== undefined){
    // 로그인 일치하는 ID,PW 있을시 채팅 페이지 이동처리
    res.redirect('/chat');
  }else{
    res.redirect('/login')
  }


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
let [email, member_password, name, birth_date, telephone, entry_type_code] = [
  req.body.uid,
  req.body.upassword,
  req.body.name,
  req.body.birth,
  req.body.telephone,
  req.body.entry_type_code
];


// 데이터 json객체로 만들기
let userMember = {
  member_id:member.length+2,
  email,
  member_password,
  name,
  telephone,
  birth_date,
  entry_type_code,
  use_state_code:1,
  reg_member_id:member.length+2,
  reg_date:Date.now()
}


let userMemberValue = Object.values(userMember);


if(userMemberValue.includes("")){
  // 입력값 존재하지 않을 때 거부하기
  res.redirect('/entry');
}else{
  // 받은 회원가입 정보 DB에 추가하기
  member.push(userMember);
  
  // 로그인 페이지 이동 처리
  res.redirect('/login');

}

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
  let foundEmail = member.find(function(e){
    return e.email === email;
  })


  if(foundEmail){
    for(let i=0; i<member.length; i++){
      if(member[i].email === foundEmail.email){
        // 로그인 페이지 이동 처리
        res.render('login', {upassword:member[i].member_password});
        return false;
      }
    }
  }
  
  res.redirect('/find');
  

  // DB에서 해당 email의 계정 PW 데이터 전송

});


// 암호 초기화 페이지 요청 및 응답
router.get('/password-init', async(req,res)=>{
  var token = req.query.token;


  res.render('password-init', {token});
});


// 암호초기화 페이지 암호 초기화 처리
// POST
// http://lacalhost:3000/password-init?token=JWT
router.post('/password-init', async(req,res,next)=>{
  var resultMsg = {
    code:200,
    data:"",
    msg:""
  }
  
  // 쿼리스트링으로 받은 토큰에서 해당 계정 데이터 찾기
  var token = req.body.token;


  try{
    // 입력 값 받기
    var password = req.body.password;
  
  
    var tokenData = await jwt.verify(token, process.env.JWT_KEY);
  
    // DB에서 해당 토큰의 계정이 존재하는지 확인하기
    var checkTokenData = await db.Member.findOne({ where:{ member_id:tokenData.member_id } });
  
    if(checkTokenData == null){  // 토큰의 계정정보 DB에 존재하지 않음
      resultMsg.code = 400;
      resultMsg.data = null,
      resultMsg.msg = "해당 토큰의 계정은 존재하지 않습니다."

      res.json(resultMsg);
    }else{  // DB에 토큰의 계정정보 존재
      // 암호 변경 로직
      var encryptPassword = await bcrypt.hash(password, 12);

      var updatedMember = await db.Member.update({ member_password:encryptPassword }, { where:{ member_id:checkTokenData.member_id } });

      resultMsg.code = 200;
      resultMsg.data = updatedMember,
      resultMsg.msg = "성공"

      res.json(resultMsg);
    }

  }catch(err){
    console.log(err);

    resultMsg.code = 500;
    resultMsg.data = null,
    resultMsg.msg = "서버 에러"

    res.json(resultMsg);
  }

});







module.exports = router;