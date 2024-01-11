const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');


// 파일명 기반 파일 확장자 조회함수
function getExtention(fileName) {
  if (fileName == '') return '';
  var arrFileName = fileName.split('.');
  console.log(arrFileName);
  return arrFileName[arrFileName.length - 1];
}


// AWS S3 업로드 객체
const upload = {
  getUpload: function (path) {

    // 해당 S3버킷 안에 폴더 위치 지정
    var s3path = 'contents/';

    if (path != '') s3path = path;

    // S3 객체를 생성시 버킷의 액세스키와 시크릿 키를 전달한다.
    const s3 = new AWS.S3({  // AWS.S3 class
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_ACCESS_SECRET_KEY,
    });


    // multerS3 s3 전용 멀터 패키지를 이용해 파일 저장 처리
const storage = multerS3({
      s3: s3,
      bucket: process.env.S3_BUCKET,
      contentType: multerS3.AUTO_CONTENT_TYPE,

      metadata: function (req, file, cb) {  // S3에 전달할 파일의 기본정보
        var ext = getExtention(file.originalname);
        cb(null, {
          fieldName: file.fieldname,
          fileNewName: Date.now().toString() + '.' + ext,  
          extention: '.' + ext,
        });
      },

      key: function (req, file, cb) {
        cb(
          null,
          `uploads/test${s3path}${Date.now()}.${getExtention(file.originalname)}`,  // S3에 저장될 파일명 형식 지정하기 /upload/contents/...
        );
      },
    });

    return multer({ storage: storage });
  },
};

exports.upload = upload;