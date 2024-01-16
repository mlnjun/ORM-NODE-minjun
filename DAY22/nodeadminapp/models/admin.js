// 관리자 정보 Model

module.exports = function(sequelize, DataTypes){
  const AdminMember = sequelize.define(
    'admin_member',
    {
      admin_member_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: "관리자 계정 고유 번호"
      },
      company_code:{
        type: DataTypes.TINYINT,
        allowNull:false,
        comment: "소속 회사 코드"
      },
      admin_id:{
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "관리자 계정 아이디"
      },
      admin_password:{
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: "관리자 계정 암호"
      },
      admin_name:{
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "관리자 이름"
      },
      email:{
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "관리자 메일 주소"
      },
      telephone:{
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "관리자 전화번호"
      },
      dept_name:{
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "부서명"
      },
      used_yn_code:{
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: "사용 여부"
      },
      reg_user_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "등록자 고유 번호"
      },
      reg_date:{
        type: DataTypes.DATE,
        allowNull: false,
        comment: "등록 일시"
      },
      edit_user_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "수정자 고유 번호"
      },
      edit_date:{
        type: DataTypes.DATE,
        allowNull: true,
        comment: "수정 일시"
      }
    },

    {
      sequelize,
      tableName:"admin_member",
      timestamps: false,
      comment: "관리자 정보 테이블",
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'admin_member_id' }]
        }
      ]
    }
)
    return AdminMember;
};