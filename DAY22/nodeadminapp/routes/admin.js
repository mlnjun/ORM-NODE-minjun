// 관리자 사이트 관리자 계정 정보관리 라우팅 기능 제공

var express = require("express");
var router = express.Router();

const bcrypt = require("bcryptjs");
const AES = require("mysql-aes");

var db = require("../models/index");


/*
-목록 페이지 호출
호출 주소 : http://localhost:3001/admin/list
GET
*/
router.get('/list',async(req,res)=>{
  // DB에서 모든 관리자 정보 찾기
  var admin_member = await db.Admin.findAll();

  res.render('admin/list',{admin_member});
});


/*
-관리자 계정 생성페이지 호출
호출주소 : http://localhost:3001/admin/create
GET
*/
router.get('/create', async(req,res,next)=>{
  res.render('admin/create');
})



/*
-관리자 계정 생성페이지 계정생성 정보 요청과 응답
호출주소 : http://localhost:3001/admin/create
POST
*/
router.post("/create", async (req, res) => {
  try {
    var admin_id = req.body.admin_id;
    var admin_password = req.body.admin_password;
    var admin_name = req.body.admin_name;
    var email = req.body.email;
    var company_code = req.body.company_code;
    var telephone = req.body.telephone;
    var dept_name = req.body.dept_name;
    var used_yn_code = 1;

    // 단방향 암호화 해시 알고리즘 적용 사용자 암호 암호화 적용
    const encryptedPassword = await bcrypt.hash(admin_password, 12);
    var encryptTelephone = AES.encrypt(telephone, process.env.MYSQL_AES_KEY);

    var admin_member = {
      company_code,
      admin_id,
      admin_password: encryptedPassword,
      admin_name,
      email,
      telephone: encryptTelephone,
      dept_name,
      used_yn_code,
      reg_member_id: 1,
      reg_date: Date.now(),
    };

    const registeredAdminMember = await db.Admin.create(admin_member);

    code = 200;
    data = registeredAdminMember;
    msg = "새 관리자 등록 완료";

    res.redirect("/admin/list");
  } catch (err) {
    console.log(err);
    code = 500;
    data = null;
    msg = "서버 관리자에게 문의하세요";
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
  var admin_member = await db.Admin.findOne({where:{admin_member_id:admin_member_id}});

  

  res.render('admin/modify', {admin_member});
});


/*
-관리자 계정 수정 페이지 수정 데이터 요청과 응답
호출주소 : http://localhost:3001/admin/modify
POST
*/
router.post('/modify/:aid', async(req,res)=>{
  // 입력 받기
  var admin_member_id = req.params.aid;
  var admin_id = req.body.admin_id;
  var admin_password = req.body.admin_password;
  var admin_name = req.body.admin_name;
  var email = req.body.email;
  var company_code = req.body.company_code;
  var telephone = req.body.telephone;
  var dept_name = req.body.dept_name;

  // 받은 입력 객체로 만들기
  var admin_member = {
      company_code,
      admin_id,
      admin_password,
      admin_name,
      email,
      telephone,
      dept_name,
      used_yn_code:1,
      reg_user_id:1,
      reg_date:Date.now()
    }

    // DB 데이터 수정하기
    await db.Admin.update(admin_member, {where:{admin_member_id}});

  res.redirect('/admin/list');
});


/*
-관리자 계정 데이터 삭제 요청과 응답
호출주소 : http://localhost:3001/admin/delete
GET
*/
router.get('/delete/:aid', async(req,res)=>{
  var admin_member_id = req.params.aid;

  // Id 정보로 DB에서 데이터 제거
  await db.Admin.destroy({where:{admin_member_id:admin_member_id}});

  res.redirect('/admin/list');
});






module.exports = router;
