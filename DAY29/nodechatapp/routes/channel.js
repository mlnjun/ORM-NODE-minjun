var express = require('express');
var router = express.Router();

/* 
기능 : 채팅 메인 웹페이지 요청및 응답 처리 라우팅 메소드
호출 주소 : http://localhost:3000/chat
*/
router.get('/', function(req, res, next) {
  res.render('channel/chat');
});

module.exports = router;
