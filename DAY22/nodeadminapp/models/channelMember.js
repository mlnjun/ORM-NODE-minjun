// 채팅 채널 정보 Model

module.exports = function(sequelize, DataTypes){
  const CannelMember = sequelize.define(
    'channel_member',
    {
      channel_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references:{
          model:'channel',
          key:'channel_id'
        },
        comment: "채널고유번호"
      },
      member_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        references:{
          model:'member',
          key:'member_id'
        },
        comment: "사용자고유번호"
      },
      nick_name:{
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "사용자닉네임"
      },
      member_type_code:{
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "사용자유형"
      },
      active_state_code:{
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "접속상태코드"
      },
      last_contact_date:{
        type: DataTypes.DATE,
        allowNull: true,
        comment: "최근접속일시"
      },
      last_out_date:{
        type: DataTypes.DATE,
        allowNull: true,
        comment: "최근아웃일시"
      },
      connection_id:{
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "커넥션아이디"
      },
      ip_address:{
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: "아이피주소"
      },
      reg_member_id:{
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "수정자아이디"
      },
      reg_date:{
        type: DataTypes.DATE,
        allowNull: true,
        comment: "수정일시"
      }
    },

    {
      sequelize,
      tableName:'channel_member',
      timestamps: false,
      comment: "채팅 채널 사용자 정보 테이블",
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [ 'channel_id', 'member_id' ]
        }
      ]
    }
)
  return CannelMember;
};