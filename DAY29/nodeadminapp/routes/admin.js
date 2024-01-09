var express = require('express');
var router = express.Router();

const bcrypt = require('bcryptjs');  // bcryptjs 단방향 암호화 패키지
const AES = require('mysql-aes');  // mysql-aes 양방향 암호화 패키지

var db = require('../models/index');

var sequelize = db.sequelize;
const { QueryTypes } = sequelize;


/*
기능 : 관리자 계정 목록 조회 웹페이지 요청
호출주소 : http://localhost:3001/admin/list
*/
router.get('/list', async(req, res, next) => {
  let searchOption = {
    companyCode : "0",
    adminid:"",
    usedYNCode:"9"
  }

  // let admins = await db.Admin.findAll();

  var sqlQuery = `SELECT admin_member_id,company_code,admin_id,admin_password,admin_name,
  CONVERT(AES_DECRYPT(UNHEX(email),'${process.env.MYSQL_AES_KEY}')USING utf8) AS email,
  CONVERT(AES_DECRYPT(UNHEX(telephone),'${process.env.MYSQL_AES_KEY}')USING utf8) AS telephone,
  dept_name,used_yn_code,reg_date,reg_member_id
  FROM modu_chat.admin_member;`

  var admins = await sequelize.query(sqlQuery, {
    raw: true,
    type: QueryTypes.SELECT,
  })


  res.render('admin/list', { admins, searchOption });
});


/*
기능 : 관리자 계정 등록 처리 웹페이지 요청
호출주소 : http://localhost:3001/admin/create
*/
router.get('/create', async(req, res, next) => {
  res.render('admin/create');
});


/*
기능 : 관리자 계정 등록 처리 라우팅 메소드
호출주소 : http://localhost:3001/admin/create
*/
router.post('/create', async(req, res, next) => {
  let [
    company_code,
    admin_id,
    admin_password,
    admin_name,
    email,
    telephone,
    used_yn_code,
    dept_name
  ] = [
    req.body.companyCode,
    req.body.adminid,
    req.body.admin_password,
    req.body.admin_name,
    req.body.email,
    req.body.telephone,
    req.body.usedYNCode,
    req.body.dept_name,
  ]


  // 관리자 암호를 해시알고리즘 기반 '단방향' 암호화 적용하기
  // bcrypt.hash('암호화할문자', 암호화변환 횟수);
  var encrpytedPassword = await bcrypt.hash(admin_password, 12);


  // 메일주소/ 전화번호 개인정보를 양방향 암호화(AES) 적용하기
  // AES.encrypt('사용자입력개인정보', 암호화보안키값)
  var encryptedEmail = AES.encrypt(email, process.env.MYSQL_AES_KEY);
  var encryptedTelephone = AES.encrypt(telephone, process.env.MYSQL_AES_KEY);


  let newAdmin = {
    company_code,
    admin_id,
    admin_password:encrpytedPassword,
    admin_name,
    email:encryptedEmail,
    telephone:encryptedTelephone,
    used_yn_code,
    dept_name,
    reg_date:Date.now(),
    reg_member_id:1
  }

  let createdAdmin = await db.Admin.create(newAdmin)


  res.redirect('/admin/list');
});


router.get('/modify/:aid', async(req, res, next) => {
  var admin_member_id = req.params.aid;


  var admins = await db.Admin.findOne({ where : { admin_member_id } });


  // AES.descrypt('암호화된 컬럼', 암호화 키)
  admins.email = AES.decrypt(admins.email, process.env.MYSQL_AES_KEY);
  admins.telephone = AES.decrypt(admins.telephone, process.env.MYSQL_AES_KEY);


  res.render('admin/modify', {admins});
});


/*
기능 : 관리자 계정 등록 처리 라우팅 메소드
호출주소 : http://localhost:3001/admin/create
*/
router.post('/modify/:aid', async(req, res, next) => {
  let [
    company_code,
    admin_id,
    admin_password,
    admin_name,
    email,
    telephone,
    used_yn_code,
    dept_name
  ] = [
    req.body.companyCode,
    req.body.adminid,
    req.body.admin_password,
    req.body.admin_name,
    req.body.email,
    req.body.telephone,
    req.body.usedYNCode,
    req.body.dept_name,
  ]


  // 관리자 암호를 해시알고리즘 기반 '단방향' 암호화 적용하기
  // bcrypt.hash('암호화할문자', 암호화변환 횟수);
  var encrpytedPassword = await bcrypt.hash(admin_password, 12);


  // 메일주소/ 전화번호 개인정보를 양방향 암호화(AES) 적용하기
  // AES.encrypt('사용자입력개인정보', 암호화보안키값)
  var encryptedEmail = AES.encrypt(email, process.env.MYSQL_AES_KEY);
  var encryptedTelephone = AES.encrypt(telephone, process.env.MYSQL_AES_KEY);


  let newAdmin = {
    company_code,
    admin_id,
    admin_password:encrpytedPassword,
    admin_name,
    email:encryptedEmail,
    telephone:encryptedTelephone,
    used_yn_code,
    dept_name,
    reg_date:Date.now(),
    reg_member_id:1
  }

  let createdAdmin = await db.Admin.create(newAdmin)


  res.redirect('/admin/list');
});




module.exports = router;