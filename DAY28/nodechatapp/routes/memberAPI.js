var express = require('express');
var router = express.Router();


//회원 정보 관리 RESTful API 라우팅 기능 제공
// http://localhost:3000/api/member

var Member = require('../schemas/member');


resultMsg = {
  code: 200,
  data:"",
  msg:""
}


// 회원 정보 관리 RESTful API 라우팅 기능 제공
// http://localhost:3000/api/member
// GET
router.get('/',async(req, res)=>{
  try{
    let members = await Member.find({});

    resultMsg.code = 200
    resultMsg.data = members
    resultMsg.msg = "Success"

  }catch(err){
    console.log(err);

    resultMsg.code = 500
    resultMsg.data = null
    resultMsg.msg = "Server Errer"
  }



  res.send(resultMsg);
});


// 계정 생성
// http://localhost:3000/api/member
// POST
router.post('/',async(req,res)=>{
  try{
    let [email, member_password, name, profile_img_path, birth_date, telephone, entry_type_code] = [
      req.body.email,
      req.body.member_password,
      req.body.name,
      req.body.profile_img_path,
      req.body.birth_date,
      req.body.telephone,
      req.body.entry_type_code
    ];
  
  
    // 데이터 json객체로 만들기
    let newMember = {
      email,
      member_password,
      name,
      profile_img_path,
      telephone,
      birth_date,
      entry_type_code,
      use_state_code:1,
    }

    let createdmembers = await Member.create(newMember);

    resultMsg.code = 200
    resultMsg.data = createdmembers
    resultMsg.msg = "Create Success"

  }catch(err){
    console.log(err);

    resultMsg.code = 500
    resultMsg.data = null
    resultMsg.msg = "Server Errer"
  }



  res.send(resultMsg);

})


// 계정 정보 수정
// http://localhost:3000/api/member/1
// PUT
router.put('/:uid',async(req,res)=>{
  try{
    let [
      email,
      member_password,
      name,
      profile_img_path,
      birth_date,
      telephone,
      entry_type_code
    ] = [
      req.body.email,
      req.body.member_password,
      req.body.name,
      req.body.profile_img_path,
      req.body.birth_date,
      req.body.telephone,
      req.body.entry_type_code
    ];
  
  
    // 데이터 json객체로 만들기
    let modifyMember = {
      email,
      member_password,
      name,
      profile_img_path,
      telephone,
      birth_date,
      entry_type_code,
      use_state_code:1,
    }
    
    let modifiedMember = await Member.updateOne(modifyMember);

    resultMsg.code = 200
    resultMsg.data = modifiedMember
    resultMsg.msg = "Modify Success"

  }catch(err){
    console.log(err);

    resultMsg.code = 500
    resultMsg.data = null
    resultMsg.msg = "Server Errer"
  }


  res.send(resultMsg);

})


// 계정 삭제
// http://localhost:3000/api/member/delete
// DELETE
router.delete('/:uid',async(req,res)=>{
  
  try{
    let member_id = req.params.uid;
    

    let deletedMember = await Member.deleteOne({ member_id, member_password });

    resultMsg.code = 200
    resultMsg.data = deletedMember
    resultMsg.msg = "Delete Success"


  }catch(err){
    console.log(err);

    resultMsg.code = 500
    resultMsg.data = null
    resultMsg.msg = "Server Errer"
  }



  res.send(resultMsg);
});


  // 단일 회원정보 데이터 조회 
// http://localhost:3000/api/member/cid
router.get('/:uid',async(req,res)=>{
  
  try{
    let member_id = req.params.uid;


    let findOneMember = await Member.findOne({member_id});

    resultMsg.code = 200
    resultMsg.data = findOneMember
    resultMsg.msg = "Find One Success"

  }catch(err){
    console.log(err);

    resultMsg.code = 500
    resultMsg.data = null
    resultMsg.msg = "Server Errer"
  }


  res.send(resultMsg);
  
})





module.exports = router;
