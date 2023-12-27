const path = require('path');
const Sequelize = require('sequelize');

//개발모드 환경설정
const env = process.env.NODE_ENV || 'development';

//DB연결 환경설정정보 변경처리//관련정보 수정
const config = require(path.join(__dirname,'..','config','config.json'))[env];

// __dirname > 현재 경로, '..' > 의 상위폴더, 'config' > 의 config 폴더

//데이터 베이스 객체
const db= {};

//DB연결정보로 시퀄라이즈 ORM 객체 생성
// class(Sequelize) > 객체(sequelize)로
// sequelize에는 DB 연결 정보를 가지고 있다.
// Sequelize는 순수 ORM 프레임워크
const sequelize = new Sequelize(config.database,config.username,config.password,config);

//DB 처리 객체에 시퀄라이즈 정보 맵핑처리
//이후 DB객체를 통해 데이터 관리가능해짐
db.sequelize = sequelize; //DB연결정보를 포함한 DB제어 객체속성(CRUD)
db.Sequelize = Sequelize; //Sequelize팩키지에서 제공하는 각종 데이터 타입 및 관련 객체정보를 제공함


//회원모델 모듈파일 참조하고 db속성정의하기
// 해당 모델을 모두 완성하고 참조해야한다.(미완성된 테이블이 만들어진다.)
db.Member = require('./member.js')(sequelize,Sequelize);

//db객체 외부로 노출하기 
module.exports = db;