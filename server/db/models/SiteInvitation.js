module.exports = (connection) => {
    const { DataTypes, Model } = require("sequelize");
    const Site = require("./Site")(connection);
    const User = require("./User")(connection);

    class SiteInvitation extends Model {}

    SiteInvitation.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            accepted: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            role: {
                type: DataTypes.STRING(32),
                allowNull: false,
                defaultValue: 'USER',
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        },
        { sequelize: connection, tableName: "siteInvitation" }
    );

    SiteInvitation.belongsTo(Site, {foreignKey: 'siteId'})
    SiteInvitation.belongsTo(User, {foreignKey: 'userId'})

    return SiteInvitation;
};
