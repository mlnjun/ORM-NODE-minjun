


const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';

const config = require(path.join(__dirname + '/../config/config.js'))[env];

const db = {};


const sequelize = new Sequelize(config.database, config.username, config.password, config);




db.sequelize = sequelize;
db.Sequelize = Sequelize;


// DB 설정 참조
db.Admin = require('./admin')(sequelize,Sequelize);
db.Member  = require('./member')(sequelize,Sequelize);
db.Channel = require('./channel')(sequelize,Sequelize);
db.ChannelMessage = require('./channelMessage')(sequelize,Sequelize);
db.ChannelMember = require('./channelMember')(sequelize,Sequelize);
db.Article = require('./article')(sequelize,Sequelize);
db.ArticleFile = require('./articleFile')(sequelize,Sequelize);


// DB FK 설정
db.Channel.hasMany(db.ChannelMember,{foreignKey: 'channel_id', sourceKey: 'channel_id'});
db.ChannelMember.belongsTo(db.Channel,{foreignKey: 'channel_id',targetKey: 'channel_id'});

db.Member.hasMany(db.ChannelMember,{foreignKey: 'member_id', sourceKey: 'member_id'});
db.ChannelMember.belongsTo(db.Member,{foreignKey: 'member_id',targetKey: 'member_id'});

db.Channel.hasMany(db.ChannelMessage,{foreignKey: 'channel_id', sourceKey: 'channel_id'});
db.ChannelMessage.belongsTo(db.Channel,{foreignKey: 'channel_id',targetKey: 'channel_id'});

db.Article.hasMany(db.ArticleFile,{foreignKey: 'article_id', sourceKey: 'article_id'});
db.ArticleFile.belongsTo(db.Article,{foreignKey: 'article_id',targetKey: 'article_id'});


module.exports = db;
