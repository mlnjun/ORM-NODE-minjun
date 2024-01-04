var express = require('express');
var router = express.Router();

// 관리자 사이트 관리자 계정 정보관리 라우팅 기능 제공


const Admin = require('../schemas/admin');

/*
-목록 페이지 호출
호출 주소 : http://localhost:3001/admin/list
GET
*/
router.get('/list',async(req,res)=>{
  // admin 계정 정보 객체 리스트
  var admin_member = await Admin.find({});

  res.render('admin/list',{admin_member});
});


/*
-관리자 계정 생성페이지 호출
호출주소 : http://localhost:3001/admin/create
GET
*/
router.get('/create', async(req,res)=>{
  res.render('admin/create');
});


/*
-관리자 계정 생성페이지 계정생성 정보 요청과 응답
호출주소 : http://localhost:3001/admin/create
POST
*/
router.post('/create', async(req, res) => {
  try {
    var company_code = req.body.company_code;
    var admin_id = req.body.admin_id;
    var admin_password = req.body.admin_password;
    var admin_name = req.body.admin_name;
    var email = req.body.email;
    var telephone = req.body.telephone;
    var dept_name = req.body.dept_name;




    var admin_member = {
      company_code,
      admin_id,
      admin_password,
      admin_name,
      email,
      telephone,
      dept_name,
      used_yn_code: "1",
      reg_date: Date.now(),
    };


    await Admin.create(admin_member);

    res.redirect('/admin/list');

  } catch(err) {
    console.error(err);
    res.status(500).send('서버에러');
  }
});


/*
-관리자 계정 수정 페이지 호출
호출주소 : http://localhost:3001/admin/modify/A
GET
*/
router.get('/modify/:aid', async(req,res)=>{
  var admin_member_id = req.params.aid;

  // admin id 데이터로 DB정보 찾기


  // 임시 데이터
  var admin_member = await Admin.findOne({admin_member_id:admin_member_id});

  res.render('admin/modify', {admin_member});
});


/*
-관리자 계정 수정 페이지 수정 데이터 요청과 응답
호출주소 : http://localhost:3001/admin/modify
POST
*/
router.post('/modify/:aid', async(req,res)=>{
  try {
    var company_code = req.body.company_code;
    var admin_id = req.body.admin_id;
    var admin_password = req.body.admin_password;
    var admin_name = req.body.admin_name;
    var email = req.body.email;
    var telephone = req.body.telephone;
    var dept_name = req.body.dept_name;


    var admin_member = {
      company_code,
      admin_id,
      admin_password,
      admin_name,
      email,
      telephone,
      dept_name,
      used_yn_code: "1",
      reg_date: Date.now(),
    };


    await Admin.updateOne(admin_member);

    res.redirect('/admin/list');

  } catch(err) {
    console.error(err);
    res.status(500).send('서버에러');
  }
});


/*
-관리자 계정 데이터 삭제 요청과 응답
호출주소 : http://localhost:3001/admin/delete
GET
*/
router.get('/delete', async(req,res)=>{
  try{
    var admin_member_id = req.query.aid;


    var deletedAdmin = await Admin.deleteOne({admin_member_id:admin_member_id});

    res.redirect('/admin/list');

  }catch(err){
    console.log(err);
    res.status(500).send('서버에러');
  }
  // Id 정보로 DB에서 데이터 찾은 후 제거

});






module.exports = router;
