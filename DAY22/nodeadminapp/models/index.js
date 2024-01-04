


const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';

const config = require(path.join(__dirname + '/../config/config.json'))[env];

const db = {};


const sequelize = new Sequelize(config.database, config.username, config.password, config);




db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.Admin = require('./admin')(sequelize,Sequelize);
db.Member  = require('./member')(sequelize,Sequelize);
db.Channel = require('./channel')(sequelize,Sequelize);
db.ChannelMessage = require('./channelMessage')(sequelize,Sequelize);
db.ChannelMember = require('./channelMember')(sequelize,Sequelize);
db.Article = require('./article')(sequelize,Sequelize);
db.ArticleFile = require('./articleFile')(sequelize,Sequelize);

module.exports = db;
