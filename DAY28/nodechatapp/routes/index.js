var express = require('express');
var router = express.Router();

// 공통기능 제공 (로그인, 회원가입, 암호찾기)


var Member = require('../schemas/member');

var resultMsg = '';


/*
-로그인 웹페이지 요청 및 응답
호출 주소 : http://localhost:3000/login
GET
*/
router.get('/login',async(req, res)=>{
  
  res.render('login',{ email:"", upassword:"", resultMsg:"" });
});


/*
-로그인 처리 요청 및 응답, 로그인 완료 후 채팅 페이지 이동 처리
호출 주소 : http://localhost:3000/login
POST
*/
router.post('/login',async(req,res)=>{
  try{
    // 사용자 입력 id, pw 입력 받기
    let email = req.body.uid;
    let member_password = req.body.upassword;
  
  
    // ID PW를 DB에서 찾기
    var loginMember = await Member.findOne({ email:email });



    if(!loginMember){
      res.render('login', { email:"", upassword:"", resultMsg:'email의 계정이 존재하지 않습니다. 다시 로그인하세요' });
    }else{
      if(loginMember.member_password === member_password){
        res.redirect('/chat');
      }else{
        res.render('login', { email:"", upassword:"", resultMsg:'암호가 틀렸습니다. 다시 로그인하세요' });
      }
    }

  }catch(err){
    console.log(err);
    res.send('서버에러');
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
  try{

  }catch(err){
    
  }
    
  // 회원가입 정보 입력 받기
  // uid, upassword, userName, age, phone
  let [email, member_password, name, profile_img_path, birth_date, telephone, entry_type_code] = [
    req.body.uid,
    req.body.upassword,
    req.body.name,
    req.body.profile_img_path,
    req.body.birth,
    req.body.telephone,
    req.body.entry_type_code
  ];


  // 데이터 json객체로 만들기
  let userMember = {
    email,
    member_password,
    name,
    profile_img_path,
    telephone,
    birth_date,
    entry_type_code,
    use_state_code:1,
    reg_date:Date.now()
  }


    let createdMember = await Member.create(userMember);

  if(!createdMember){
    // 입력값 존재하지 않을 때 거부하기
    res.redirect('/entry');
  }else{
    
    // 로그인 페이지 이동 처리
    res.render('login', {
      email:email, upassword:member_password, resultMsg:'회원가입이 완료되었습니다.'
    });

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










module.exports = router;