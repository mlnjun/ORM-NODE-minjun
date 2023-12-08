var express = require('express');
var router = express.Router();

/* 
메 페이지 요청과 응답처리 라우팅 메소드
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// 콜백함수를 router.get()메소드의 파라미터로 호출주소와 콜백함수를 전달해서
// router.get()메소드가 요청과 응답을 처리하게한다.
// 기본 콜백함수를 전달해서 진행됨.
router.get('/main',async(req, res)=>{  // function > async 교체, 화살표 함수로 대체
  res.render('index',  { title: '메인페이지' });
});


// 같은 main페이지를 주소만 다르게 한다.
// 콜백함수가 아닌 async,await 방식을 통한 router.get()메소드를 실행하는 방법
// 비동기 프로그래밍의 절차중심 기능개발시 promise 또는 async/await이란 방식을 이용하면
// 비동기 프로그래밍 환경에서 순차적 프로그래밍 가능하다.(콜백지옥없이)
router.get('/index',async(req, res)=>{
  res.render('index',  { title: 'index 페이지' });
});




// RESTful Service

/* 
기능 : 상품 목록 데이터에 대한 요청과 응답처리 라우팅 메소드
요청 방식 : GET
요청 주소 : httpL//localhost:3000/api/products
응답 결과 : 상품목록 JSON데이터 목록
*/

router.get('/products', async(req,res)=>{
  var product = [
    {
      pid:1,
      pname:"노트북",
      price:5000,
      stock:4
    },
    {
      pid:2,
      pname:"삼성 노트북",
      price:7000,
      stock:2
    }
  ];

  // res.json('json데이터 ')메소드는 지정한 json데이터를 브라우저로 전송해준다.
  res.json(product);
})





module.exports = router;
