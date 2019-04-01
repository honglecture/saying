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

module.exports = db;