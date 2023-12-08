// productAPI.JS의 기본호출주소는 http//localhost:3000/api/product/~

var express = require('express');
var router = express.Router();


router.get('/',async()=>{

})

/* 
기능 : 상품 목록 데이터에 대한 요청과 응답처리 라우팅 메소드
요청 방식 : GET
요청 주소 : http//localhost:3000/api/product/list
응답 결과 : 상품목록 JSON데이터 목록
*/
router.get('/list', async(req,res)=>{
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