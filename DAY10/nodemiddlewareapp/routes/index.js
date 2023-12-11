var express = require('express');
var router = express.Router();

// 미들웨어 함수 참조하기
const {checkParams, checkQueryKey} = require('./middleware')



// 라우터 미들웨어 함수 샘플3
// index.js 라우턱 실행될 때마다 실행되고 주소를 체크하는 함수
router.use(async(req, res, next)=>{
  console.log("Index.js라우터 미들웨어 함수 샘플1 :", Date.now());
  next();
});


// 해당 라우터에서 해당 호출 주소 체계와 일치하는 경우 매번 실행되는 미들웨어 함수
// http://localhost:3000/sample/computer
router.use('/sample/:id',function(req, res, next){
  console.log('Index 라우터 미들웨어 함수2 Request, URL-',req.originalUrl);
  next();
},function(req, res, next){
  console.log('Index 라우터 미들웨어 함수3-Request Type :', req.method);
  res.send(req.method);
});


/* 메인페이지 요청과 응답 처리 라우팅 메소드 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// 파라미터 id값이 존재하는지 체크하는 미들웨어함수 적용하기
// http://localhost:3000/test/kmj
router.get('/test/:id',checkParams, function(req, res){
  res.render('index', { title: 'Express' });
});


// 쿼리스트링 category키값이 존재하는지 체크하는 미들웨어함수 적용하기
// http://localhost:3000/product?category=computer&stock=100
router.get('/product',checkQueryKey, function(req, res){
  res.render('index', {title:'Express'});
})


module.exports = router;
