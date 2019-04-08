const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Member = require('./member')(sequelize, Sequelize);
db.Category = require('./category')(sequelize, Sequelize);
db.Saying = require('./saying')(sequelize, Sequelize);
db.Slike = require('./slike')(sequelize, Sequelize);
db.Bookmark = require('./bookmark')(sequelize, Sequelize);
db.Reply = require('./reply')(sequelize, Sequelize);

/**
 * 
 * Country.hasMany(City, {foreignKey: 'countryCode', sourceKey: 'isoCode'});
City.belongsTo(Country, {foreignKey: 'countryCode', targetKey: 'isoCode'});
 * 
 */


db.Member.hasMany(db.Saying, {
  foreignKey : 'writerId',
  sourceKey : 'id'
});

db.Saying.belongsTo(db.Member, {
  foreignKey: 'writerId',
  targetKey : 'id'
});



/* like */
db.Saying.hasMany(db.Slike, {
  foreignKey : 'sayingId',
  sourceKey : 'id'
});

db.Slike.belongsTo(db.Saying, {
  foreignKey: 'sayingId',
  targetKey : 'id'
});


db.Member.hasMany(db.Slike, {
  foreignKey : 'memberId',
  sourceKey : 'id'
});

db.Slike.belongsTo(db.Member, {
  foreignKey: 'memberId',
  targetKey : 'id'
});


/* bookmark */
db.Saying.hasMany(db.Bookmark, {
  foreignKey : 'sayingId',
  sourceKey : 'id'
});

db.Bookmark.belongsTo(db.Saying, {
  foreignKey: 'sayingId',
  targetKey : 'id'
});

db.Member.hasMany(db.Bookmark, {
  foreignKey : 'memberId',
  sourceKey : 'id'
});

db.Bookmark.belongsTo(db.Member, {
  foreignKey: 'memberId',
  targetKey : 'id'
});







/* reply */
db.Saying.hasMany(db.Reply, {
  foreignKey : 'sayingId',
  sourceKey : 'id'
});

db.Reply.belongsTo(db.Saying, {
  foreignKey: 'sayingId',
  targetKey : 'id'
});

db.Member.hasMany(db.Reply, {
  foreignKey : 'writerId',
  sourceKey : 'id'
});

db.Reply.belongsTo(db.Member, {
  foreignKey: 'writerId',
  targetKey : 'id'
});






module.exports = db;