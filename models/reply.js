const moment = require('moment');
module.exports = (sequelize, DataTypes) => (
    sequelize.define('Reply',{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        writerId: {
            type: DataTypes.STRING(100),
        },
        sayingId: {
            type: DataTypes.BIGINT,
        },
        content: {
            type: DataTypes.STRING(1000),
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