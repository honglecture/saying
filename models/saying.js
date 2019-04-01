module.exports = (sequelize, DataTypes) => (
    sequelize.define('Saying',{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        photo: {
            type: DataTypes.STRING(100),
        },
        name: {
            type: DataTypes.STRING(100),
        },
        content: {
            type: DataTypes.STRING(5000),
        },
        writerId: {
            type: DataTypes.STRING(100),
        },
        tag: {
            type: DataTypes.STRING(100),
        },
        categoryId: {
            type: DataTypes.BIGINT,
        },
        regDate:{
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    })
);