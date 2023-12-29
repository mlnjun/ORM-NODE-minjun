module.exports = function(sequelize, DataTypes){
  return sequelize.define(
    'channel_msg',
    {
      channel_msg_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: '채널 고유 아이디'
      },
      channel_id:{
        type: DataTypes.INTEGER,
        allowNull:false,
        comment:'커뮤니티 고유번호'
      },
      category_code:{
        type: DataTypes.INTEGER,
        allowNull: false,
        comment:'채널 분류 코드'
      },
      channel_name:{
        type: DataTypes.STRING(100),
        allowNull: false,
        comment:'채널명'
      },
      user_limit:{
        type: DataTypes.INTEGER,
        allowNull: false,
        comment:'채널 간략 소개'
      },
      channel_img_path:{
        type: DataTypes.STRING(200),
        allowNull: false,
        comment:'동시채널 접속자 수'
      },
      channel_desc:{
        type: DataTypes.STRING(1000),
        allowNull: false,
        comment:'대표이미지주소'
      },
      channel_state_code:{
        type: DataTypes.TINYINT,
        allowNull: false,
        comment:'채널오픈상태코드'
      },
      reg_date:{
        type: DataTypes.DATE,
        allowNull: false,
        comment:'등록일시'
      },
      reg_member_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        comment:'등록아이디'
      },
      edit_date:{
        type: DataTypes.DATE,
        allowNull: true,
        comment:'수정일시'
      },
      edit_member_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        comment:'수정자아이디'
      },
    },
    {
    sequelize,
    tableName: 'channel_message',
    timestamps: false,
    comment: '채널 정보',
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{name: 'channel_id'}]
      }
    ]
    }
);};



// const Channel_FK = require('./channel');

// Channel_FK.belongTo(channel,{
//   foreignKey: 'channel_id',
//   targetKey: 'channel_id'
// })