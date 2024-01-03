// 게시글 정보관리 각종 웹페이지 요청과 응답처리 라우터 전용파일
// http://localhost:3000/article/~

var express = require('express');
var router = express.Router();

var moment = require('moment');


// MongoDB ODB 모델 참조하기
const Article = require('../schemas/article');


//  게시글 목록 조회 웹페이지 요청 및 응답 라우팅 메소드
router.get('/list', async(req, res)=>{

  var searchOption = {
    boardTypeCode:"0",
    title:"",
    isDisplayCode:"9"
  }

  // step1 : 모든 게시글 데이터를 불러옵니다.
  const articles = await Article.find({});





  // step2 : 게시글 전체 목록을 list.ejs뷰에 전달한다.
  res.render('article/list',{articles,searchOption,moment});
})


// 게시글 목록에서 조회옵션 데이터를 전달받아 조회옵션기반 게시글 목록 조회 후
// 게시글 목록 페이지에 대한 요청과 응답처리
router.post('/list',async(req,res)=>{
  // 사용자가 선택/입력한 조회 옵션 데이터를 추출한다.
  var boardTypeCode = req.body.boardTypeCode;
  var title = req.body.title;
  var isDisplayCode = req.body.isDisplayCode;

  var searchOption = {
    boardTypeCode,
    title,
    isDisplayCode
  }


  // step2: 사용자가 입력/선택한 조회 옵션 데이터를 기반으로 DB에서 게시글 목록을 재조회해온다.
  // 리스트
  const articles = [
    {
      article_id:1,
      board_type_code : boardTypeCode,
      title,
      contents:"공지게시글 1번 내용입니다.",
      view_count:10,
      ip_address:"111.111.124.44",
      is_display_code:isDisplayCode,
      reg_date:"2023-12-14",
      reg_member_id:"kmj"
    }
  ]


  // step3: 게시글 목록 페이지 list.ejs에 데이터 목록을 전달한다.
  res.render('article/list', {articles,searchOption});
});


// 신규 게시글 등록 웹페이지 요청 및 응답 라우팅 메소드
// http://localhost:3000/article/create
router.get('/create', async(req, res)=>{
  res.render('article/create');
})


// 신규 게시글 사용자 등록 정보 처리 요청및 응답 라우팅 메소드
router.post('/create', async(req, res)=>{

  // step1:사용자가 입력한 게시글 등록 데이터 추출
  var title = req.body.title;
  var contents = req.body.contents;
  var article_type_code = req.body.articleTypeCode;
  var is_display_code = req.body.isDisplayCode;
  var edit_member_id = req.body.register;


  // step2 : 추출된 사용자 입력 데이터를 단일 게시글 json데이터로 구성해서
  // DB article테이블에 영구적으로 저장처리한다.
  // 저장처리 후 article테이블에 저장된 데이터 반환 됩니다.

  // 등록할 게시글 데이터
  var article = {
    title,
    contents,
    article_type_code,
    view_count:0,
    is_display_code,
    edit_member_id
  }

  const newArticle = await Article.create(article);


  // stpe3 : 등록처리 후 게시글 목록 웹페이지로 이동 처리
  res.redirect('/article/list');
})


// 기존 게시글 정보 확인 및 수정 웹페이지 요청과 응답 라우팅 메소드
// http://localhost:3000/article/modify/1
// GET
router.get('/modify/:aid', async(req, res)=>{

  // step1 : 선택한 게시글 고유번호를 파라미터 방식으로 URL을 통해 전달받음
  var articleIdx = req.params.aid;

  // step2 : 해당 게시글 번호에 해당하는 특정 단일 게시글 정보를 DB article테이블에서
  // 가져온다.
  // var articles = await Article.find({article_id:articleIdx});  // find는 하나여도 배열값으로 반환(단일객체x)
  var article = await Article.findOne({article_id:articleIdx});

  // var article = null;
  // if(articles.length > 0){
  //   article = articles[0];
  // }

  // step3 : 단일 게시글 정보로 뷰에 전달한다.
  res.render('article/modify',{article});
});


// 기존 게시글 삭제처리 요청 및 응답 라우팅 메소드
// http://localhost:3000/article/delete?aid=1
router.get('/delete', async(req, res)=>{

  // step1 : 삭제하려는 게시글 고유번호 추출
  var articleIdx = req.query.aid

  // step2 : 게시글 고유번호로 실제 DB article테이블에서 데이터를 삭제 처리한다.
  const result = await Article.deleteOne({article_id:articleIdx});


  // step3 : 게시글 목록페이지로 이동 처리
  res.redirect('/article/list');
})


// 와일드 카드 메소드 맨 밑으로 정렬
// 기존 게시글 사용자 수정정보 처리 요청과 응답 라우팅 메소드
// http://localhost:3000/article/delete?aid=1
// POST
router.post('/modify/:aid', async(req, res)=>{
  var articleIdx = req.params.aid;

  // step1:사용자가 입력한 게시글 등록 데이터 추출
  var title = req.body.title;
  var contents = req.body.contents;
  var article_type_code = req.body.articleTypeCode;
  var is_display_code = req.body.isDisplayCode;
  var edit_member_id = req.body.register;


  // step2 : 추출된 사용자 입력 데이터를 단일 게시글 json데이터로 구성해서
  // DB article테이블에 수정처리한다.
  // 수정 처리하면 처리건수 값이 반환됩니다.

  // 수정할 게시글 데이터
  var article = {
    article_id:articleIdx,
    title,
    contents,
    article_type_code,
    is_display_code,
    edit_member_id,
    edit_date:Date.now()
  }


  const result = await Article.updateOne({article_id:articleIdx},article);

  // stpe3 : 수정처리 후 게시글 목록 웹페이지로 이동 처리
  res.redirect('/article/list');
})






module.exports = router;
