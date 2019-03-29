require('dotenv').config();

module.exports = {
  development: {
    username: 'honglecture',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'saying',
    host: 'honglecture.iptime.org',
    dialect: 'mysql',
    pool: {
        "max": 5,
        "min": 0,
        "acquire": 30000, 
        "idle": 10000
    },
    define: {
        "freezeTableName": true,
        "timestamps": false
    }
  },
  production: {
    username: 'honglecture',
    password: process.env.SEQUELIZE_PASSWORD,
    database: 'saying',
    host: 'honglecture.iptime.org',
    dialect: 'mysql',
    logging: false,
    pool: {
        "max": 5,
        "min": 0,
        "acquire": 30000, 
        "idle": 10000
    },
    define: {
        "freezeTableName": true,
        "timestamps": false
    }
  },
};