// 채팅 채널 정보 Model

module.exports = function(sequelize, DataTypes){
  return sequelize.define(
    'channel_message',
    {
      channel_msg_id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true,
        allowNull: false,
        comment: "로깅고유번호"
      },
      channel_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model:'channel',
          key:'channel_id'
        },
        comment: "채널고유번호"
      },
      member_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "사용자고유번호"
      },
      nick_name:{
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "채팅닉네임"
      },
      msg_type_code:{
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "로깅유형코드"
      },
      connection_id:{
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "채팅고유커넥션아이디"
      },
      message:{
        type: DataTypes.STRING(1000),
        allowNull: false,
        comment: "원본채팅메시지"
      },
      ip_address:{
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: "IP주소"
      },
      top_channel_msg_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "최상위메시지고유번호"
      },
      msg_state_code:{
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "메시지상태코드"
      },
      msg_date:{
        type: DataTypes.DATE,
        allowNull: false,
        comment: "등록일시"
      },
      reg_date:{
        type: DataTypes.DATE,
        allowNull: true,
        comment: "수정일시"
      },
      del_date:{
        type: DataTypes.DATE,
        allowNull: true,
        comment: "삭제일시"
      }
    },

    {
      sequelize,
      tableName:"channel_message",
      timestamps: false,
      comment: "채팅 채널 메시지 테이블",
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name:'channel_msg_id' }]
        }
      ]
    }
)};