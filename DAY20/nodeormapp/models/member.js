module.exports = function (sequelize, DataTypes) {
  // sequelize.define()은 해당 구조를 통해 물리적 테이블을 생성시키는 기능 제공
  // sequelize.define('테이블명',관리항목(컬럼)구조정의, 테이블생성옵션)
  return sequelize.define(  
    'member',  // 기본 복수형으로 만들어짐 > members
    {
      // 관리항목(컬럼) 구조정의
      member_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,  // 자동 증가 AI
        primaryKey: true,   // PK
        allowNull: false,  // false = Not Null
        comment: '회원고유번호',
      },
      email: {
        type: DataTypes.STRING(100),
        // primaryKey: false,
        allowNull: false,
        comment: '사용자메일주소',
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: '사용자암호',
      }
    },
    //테이블 생성옵션
    {  
      // 실무에서 잘 사용하지는 않음
        timestamps: true,  // 등록일시(createdAT), 수정일시(updatedAT) 컬럼 자동생성
        paranoid: true  // 데이터 삭제 컬럼 자동 생성(deletedAT) 및 물리적 데이터 삭제안함 기능제공
    });
};