module.exports = (sequelize, DataTypes) => (
    sequelize.define('Bookmark',{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        sayingId: {
            type: DataTypes.BIGINT,
        }, 
        memberId: {
            type: DataTypes.STRING(100),
        },
        regDate:{
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    },
    {
        freezeTableName: true,
    }
    )
);