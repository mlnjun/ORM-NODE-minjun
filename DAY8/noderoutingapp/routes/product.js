var express = require('express');
var router = express.Router();


// 상품목록 웹페이지 요청과 응답 라우팅 메소드
// localhost:3000/product/list
router.get('/list', async(req, res)=>{
  res.render('product/list');
})


// 단일상품 상세정보 보기 웹페이지에 대한 요청과 응답하기
// localhost:3000/product/detail?pid=1&pname=lg노트북
router.get('/detail', async(req, res)=>{

  // URL에 쿼리스트링방식으로 전달된 값 추출하기
  // URL에 QueryStirng방식으로 파라미터가 전달되면 req.query.키명 으로 키의 값을 추출할 수 있다.
  var productID = req.query.pid;
  var productName = req.query.pname;

  res.render('product/detail', {productID, productName});
});




// 와일드카드 이용시 주의 사항 : 동일한 URL 호출주소와 호출방식(GET)의 라우팅 메소드가 존재하는 경우
// 와일드 카드 방식이 먼저 호출되고 다른 라우팅 메소드 주소는 호출이 무시된다.
// 호출주소체계: localhost:3000/product/detail/sample
// 호출방식 : GET
// 중요 : 와일드 카드 방식으로 주소체계가 정의된 라우팅메소드는 해당 라우터 파일에 맨 하단에
//        반드시 배치해야 한다.
router.get("/detail/sample", async(req, res)=>{
  res.render('product/detail',{productID:100,productName:"노트북"});
});


// res.send() : 만능 메소드
// 호출주소 : http://localhost:3000/product/detail/sendall
router.get('/detail/sendall',async(req,res)=>{
  // 문자열 데이터를 보내보자
  // res.send('안녕하세요.');

  // json데이터 전송
  // res.send({uid: "kmj", username:"aaa"});

  
  // var htmlTag = `
  //   <html>
  //     <body>
  //       <h1>샘플 웹페이지1 </h1>
  //     <body>
  //   <html>
  // `;

  // res.send(htmlTag);


  // 서버에 저장된 파일을 다운로드 해보자
  // console.log("__dirname 물리적 경로 확인하기 :",__dirname+"maple.png");
  // res,sendFile('해당 파일의 전체 물리적 경로를 저정해준다.')
  res.sendFile(__dirname+"/maple.png");




})





// 파라미터 방시으로 전달된 상품정보를 추출해 단일상품 정보를 보여주자
// 호출주소 : localhost:3000/product/detail/1
router.get("/detail/:pid",async(req, res)=>{

  // URL을통해 파라미터 방식으로 값이 전달되면
  // 주소체계내에 와일드카드 키를 설정하고 해당 키명으로 URL을 통해 전달된 파라미터값을
  // 추출할 수 있다.
  // req.params.와일드카드 키 명
  var productID = req.params.pid;

  res.render('product/detail',{productID,productName:"노트북"});
});


// 호출 주소 : http://localhost:3000/product/detail/1/LG노트북/6000
// 호출 방식 : GET
// 여러개의 파라미터를 여러개의 와일드카드 키명으로 호출
router.get("/detail/:pid/:pname/:price",async(req, res)=>{
  var productID = req.params.pid;
  var productName = req.params.pname;
  var price = req.params.price;

  res.render("product/detail",{productID, productName, price});
});

module.exports = router;