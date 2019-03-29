module.exports = (sequelize, DataTypes) => (
    sequelize.define('Member',{
        id: {
            type: DataTypes.STRING(100),
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING(300),
        },
        nickname: {
            type: DataTypes.STRING(100),
        },
        email: {
            type: DataTypes.STRING(100),
        },
        photo: {
            type: DataTypes.STRING(100),
            defaultValue: 'default',
        },
        regDate:{
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    })
);