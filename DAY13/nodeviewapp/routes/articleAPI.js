

// 게시글 데이터 관리 전용 RESTful API 라우터 파일
// 기본 라우터 호출 주소 :  http://localhost:3000/api/article/~

var express = require('express');
var router = express.Router();


// 전체 게시글 목록 데이터 조회 반환 API 라우팅 메소드
// http://localhost:3000/api/article/all
router.get('/all',async(req, res)=>{

  // API라우팅 메소드 반환 형식 정의
  var apiResult = {
    code:200,  // 성공적으로 불러왔을 때의 오류 코드 = 문제없음, 400 = 불러오지 못함
    data:[],
    result:"OK"
  }

    // try-catch구문 : 예외처리 구문
  // 기본적으로는 app.js에서 error handler에서 웹페이지에서 에러를 보여준다.
  // 순수 데이터만 요청하는(웹페이지X) API에서는 데이터 형태로 확인 해야한다.
  try{
    // try블록 안에 에러가 발생할 수 있는 각종 개발자 코드 구현

    // step1 : DB에서 전체 게시글 목록 데이터를 조회한다.
    const articles = [
      {
        article_id:1,
        board_type_code:1,
        title:"공지게시글 1번글입니다.",
        contents:"공지게시글 1번 내용입니다.",
        view_count:10,
        ip_address:"111.111.124.44",
        is_display_code:1,
        reg_date:"2023-12-14",
        reg_member_id:"kmj",
        article_type_code:1
      },
      {
        article_id:2,
        board_type_code:2,
        title:"기술 블로깅 게시글 1번글입니다.",
        contents:"기술 게시글 1번 내용입니다.",
        view_count:20,
        ip_address:"222.111.124.44",
        is_display_code:0,
        reg_date:"2023-12-13",
        reg_member_id:"kmj",
        article_type_code:1
      },
      {
        article_id:3,
        board_type_code:2,
        title:"기술 게시글 입니다.",
        contents:"기술 게시글 내용입니다.",
        view_count:30,
        ip_address:"123.111.124.44",
        is_display_code:1,
        reg_date:"2023-12-14",
        reg_member_id:"kmj",
        article_type_code:1
      }
    ];

    // 프론트엔드로 변환할 실제 데이터 바인딩
    apiResult.code = 200;
    apiResult.data = articles;
    apiResult.result = "OK";

  }catch(err){
    // console.log(err.message);  // 보안상 에러 코드를 클라이언트에 직접적으로 보내지 않는다
    
    // 서버특 에러코드는 프론트엔드나 사용자에게 직접 정보를 제공하지 않고 대표 메시지를 안내한다.
    // 서버측 에러코드는 추후 별도 로깅시스템 구현을 통해 서버에 특정 폴더 내에 로그파일로 기록하거나
    // 백엔드 에러 발생 알림 시스템(sns, email등등)을 통해 실시간 에러정보를 노티해준다.
    apiResult.code = 500;
    apiResult.data = null;  // null or []빈배열
    apiResult.result = "Failed";
  }




  res.json(apiResult);
});

// 신규게시글 등록처리 API 라우팅 메소드
// http://localhost:3000/api/article/create
router.post('/create',async(req, res)=>{

  // API라우팅 메소드 반환 형식 정의
  var apiResult = {
    code:200,  // 성공적으로 불러왔을 때의 오류 코드 = 문제없음, 400 = 불러오지 못함
    data:[],
    result:"OK"
  }

  try{

    // step1 : 프론트엔드에서 전달해준 신규 게시글 json데이터 추출하기
    // step1:사용자가 입력한 게시글 등록 데이터 추출
    var boardTypeCode = req.body.boardTypeCode;
    var title = req.body.title;
    var contents = req.body.contents;
    var articleTypeCode = req.body.articleTypeCode;
    var isDisplayCode = req.body.isDisplayCode;
    var register = req.body.register;


    // step2 : 추출된 사용자 입력 데이터를 단일 게시글 json데이터로 구성해서
    // DB article테이블에 영구적으로 저장처리한다.
    // 저장처리 후 article테이블에 저장된 데이터 반환 됩니다.

    // 등록할 게시글 데이터
    var article = {
      boardTypeCode,
      title,
      contents,
      articleTypeCode,
      isDisplayCode,
      register,
      registDate:Date.now()
    }


    // step2 : DB article 테이블에 데이터를 등록하고 등록된 데이터가 반환된다.
    var savedArticle = {
      article_id:1,
      board_type_code:1,
      title:"공지게시글 1번글입니다.",
      contents:"공지게시글 1번 내용입니다.",
      view_count:10,
      ip_address:"111.111.124.44",
      is_display_code:1,
      reg_date:"2023-12-14",
      reg_member_id:"kmj",
      article_type_code:1
    }


    // step3 : 정상 데이터 등록처리 결과값 세팅하기
    apiResult.code = 200;
    apiResult.data = savedArticle;
    apiResult.result = "Ok";


  }catch(err){
    apiResult.code = 500;
    apiResult.data = null;  // null or []빈배열
    apiResult.result = "Failed";
  }


  res.json(apiResult);
});


// 단일 게시글 수정처리 API 라우팅 메소드
// http://localhost:3000/api/article/update
router.post('/update',async(req, res)=>{

  // API라우팅 메소드 반환 형식 정의
  var apiResult = {
    code:200,  // 성공적으로 불러왔을 때의 오류 코드 = 문제없음, 400 = 불러오지 못함
    data:[],
    result:"OK"
  }

  try{

    // step1:사용자가 수정한 게시글 수정 데이터 추출
    var articleIdx = req.body.articleIdx;  // 고유 번호

    // 수정한 내용
    var boardTypeCode = req.body.boardTypeCode;
    var title = req.body.title;
    var contents = req.body.contents;
    var articleTypeCode = req.body.articleTypeCode;
    var isDisplayCode = req.body.isDisplayCode;
    var register = req.body.register;


    // step2 : 추출된 사용자 수정 데이터를 단일 게시글 json데이터로 구성해서
    // DB article테이블에 수정 처리 반영한다.
    // 수정처리 후 적용건수 반환됨

    // 등록할 게시글 데이터
    var article = {
      articleIdx,
      boardTypeCode,
      title,
      contents,
      articleTypeCode,
      isDisplayCode,
      register,
      registDate:Date.now()
    };


    // step2 : 수정처리 후 처리건수가 반환됨
    // DB수정처리함 처리 후 적용건수 1이 반환되었다고 가정함
    var affectedCnt = 1;


    // step3 : 정상 수정된 정보를 apiResult객체 바인딩함
    apiResult.code = 200;
    apiResult.data = affectedCnt;
    apiResult.result = "Ok"


  }catch(err){
    apiResult.code = 500;
    apiResult.data = 0;
    apiResult.result = "Failed";

  }


  res.json(apiResult);
});


// 단일 게시글 데이터 조회 반환 API 라우팅 메소드
// http://localhost:3000/api/article/1
router.get('/:aidx',async(req, res)=>{

  // API라우팅 메소드 반환 형식 정의
  var apiResult = {
    code:200,  // 성공적으로 불러왔을 때의 오류 코드 = 문제없음, 400 = 불러오지 못함
    data:[],
    result:"OK"
  }


  try{

    // step1 : url을 통해 전달된 게시글 고유번호를 추출한다.
    var articleIdx = req.params.aidx;


    // step2 : 게시글고유번호에 해당하는 단일 게시글 정보를 DB에서 조회해본다
    var article = {
      articleIdx,
      article_id:1,
      board_type_code:1,
      title:"공지게시글 1번글입니다.",
      contents:"공지게시글 1번 내용입니다.",
      view_count:10,
      ip_address:"111.111.124.44",
      is_display_code:1,
      reg_date:"2023-12-14",
      reg_member_id:"kmj",
      article_type_code:1
    }


    // step3 : 정상 조회된 정보를 apiResult객체 바인딩함
    apiResult.code = 200;
    apiResult.data = article;
    apiResult.result = "Ok";

  }catch(err){
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.result = "Failed";
  }


  res.json(apiResult);
});


// 단일 게시글 삭제 처리 반환 API 라우팅 메소드
// http://localhost:3000/api/article/1
router.delete('/:aidx',async(req, res)=>{

  // API라우팅 메소드 반환 형식 정의
  var apiResult = {
    code:200,  // 성공적으로 불러왔을 때의 오류 코드 = 문제없음, 400 = 불러오지 못함
    data:[],
    result:"OK"
  }


  try{

    // step1 : ulr주소에서 게시글 고유번호를 추출한다.
    var articleIdx = req.params.aidx;


    // step2 : DB의 article 테이블에서 해당 게시글 번호글을 완전 삭제처리한다.


    // step3 : DB에서 삭제된 건수가 전달된다.
    var deletedCnt = 1;


    // step4 : 정상 삭제된 정보를 apiResult객체 바인딩함
    apiResult.code = 200;
    apiResult.data = deletedCnt;
    apiResult.result = "Ok";

  }catch(err){
    apiResult.code = 500;
    apiResult.data = 0;
    apiResult.result = "Failed";

  }


  res.json(apiResult);
});




module.exports = router;