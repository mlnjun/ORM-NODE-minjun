module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'channel_msg',
    {
      channel_msg_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '채널 메세지 고유번호',
      },
      channel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '채널고유번호',
      },
      member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '메세지 발생 회원 고유번호',
      },
      nickname: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '대화명',
      },
      msg_type_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '메세지 유형 코드 0:퇴장메세지, 1:입장메세지, 2:일반사용자메세지, 3:파일공유메세지, 4:시스템공지메세지',
      },
      connection_id: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '웹소켓 고유연결 아이디',
      },
      message: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        comment: '메세지 내용',
      },
      ip_address: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '사용자 IP주소',
      },
      msg_state_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '메세지 상태 코드 0:삭제, 1:사용중',
      },
      msg_date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: '메세지 작성 일시',
      },
      edit_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '메세지 수정일시',
      },
      del_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: '메세지 삭제일시',
      },
    },
    {
      sequelize,
      tableName: 'channel_msg',
      timestamps: false,
      comment: '채널 메세지 정보',
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'channel_msg_id' }],
        },
      ],
    }
  );
};