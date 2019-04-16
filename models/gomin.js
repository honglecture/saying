const moment = require('moment');
module.exports = (sequelize, DataTypes) => (
    sequelize.define('Gomin',{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(500),
        },
        content: {
            type: DataTypes.STRING(5000),
        },
        writerId: {
            type: DataTypes.STRING(100),
        },
        hit: {
            type: DataTypes.BIGINT,
        },
        regDate:{
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            get: function() {
                return moment(this.getDataValue('regDate')).format('YYYY-MM-DD')
            }
        }
    })
);