module.exports = (sequelize, DataTypes) => (
    sequelize.define('Category',{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        value: {
            type: DataTypes.STRING(100),
        }
    })
);