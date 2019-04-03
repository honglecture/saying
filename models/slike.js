module.exports = (sequelize, DataTypes) => (
    sequelize.define('Slike',{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        memberId: {
            type: DataTypes.STRING(100),
        },
        sayingId: {
            type: DataTypes.BIGINT,
        }
    })
);