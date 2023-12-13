var express = require('express');
var router = express.Router();


//회원 정보 관리 RESTful API 라우팅 기능 제공
// http://localhost:3000/api/member

let userMember = [
  {
    userid : 'asd111',
    upassword :'asd123',
    userName : 'A',
    age : 1,
    phone :  '010-9999-9999',
    email : 'asd123@gmail.com',
  },
  {
    userid : 'asd222',
    upassword :'asd222',
    userName : 'b',
    age : 2,
    phone :  '010-8888-8888',
    email : 'asd222@gmail.com',
  },
  {
    userid : 'asd333',
    upassword :'asd333',
    userName : 'C',
    age : 3,
    phone :  '010-7777-7777',
    email : 'asd333@gmail.com',
  }
]


// 회원 정보 관리 RESTful API 라우팅 기능 제공
// http://localhost:3000/api/member/all
router.get('/all',async(req, res)=>{
  res.json(userMember);
});


// 계정 생성
// http://localhost:3000/api/member/create
router.post('/create',async(req,res)=>{

  let newMember = req.body;


  userMember.push(newMember);


  res.json(userMember);

})


// 계정 정보 수정
// http://localhost:3000/api/member/modify
router.post('/modify',async(req,res)=>{
  let modifyMember = req.body;


  for(let i = 0; i<userMember.length; i++){
    if(userMember[i].userid == modifyMember.userid){
      userMember[i] = modifyMember;
      // console.log(channelData[i]);
      res.json(userMember);
    }else{
      res.send("해당 채널은 존재하지 않습니다.");
    }
  }

})


// 계정 삭제
// http://localhost:3000/api/member/delete
router.post('/delete',async(req,res)=>{
  let userid = req.body.userid;
  let upassword = req.body.upassword;

  
  let index

  for(let i = 0; i<userMember.length; i++){
    if((userMember[i].userid == userid) && (userMember[i].upassword == upassword)){
      userMember.splice(i, 1);
      // console.log(channelData[i]);j
      res.json(userMember);
      index = i;
      break;
    }
  }



  if(userMember[index] == undefined){
    res.send("해당 계정은 존재하지 않습니다.");
  }
});


  // 단일 회원정보 데이터 조회 
// http://localhost:3000/api/member/cid
router.get('/mid/:userid',async(req,res)=>{
  let userid = req.params.userid;


  for(let i = 0; i<userMember.length; i++){
    if(userMember[i].userid == userid){
      res.json(userMember[i]);
      break;
    }
  }
  
})





module.exports = router;
