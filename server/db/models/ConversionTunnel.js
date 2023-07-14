module.exports = (connection) => {
    const { DataTypes, Model } = require("sequelize");

    class ConversionTunnel extends Model {}

    ConversionTunnel.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(32),
                allowNull: false,
                validate: {
                    len: [1, 32],
                },
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        { sequelize: connection, tableName: "conversionTunnel" }
    );

    ConversionTunnel.associate = (models) => {
        ConversionTunnel.belongsTo(models.Site, { foreignKey: "siteId" });
        ConversionTunnel.belongsTo(models.User, { foreignKey: "createdBy" });
    }

    return ConversionTunnel;
};