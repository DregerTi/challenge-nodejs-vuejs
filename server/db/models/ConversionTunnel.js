module.exports = (connection) => {
    const { DataTypes, Model } = require("sequelize");
    const db = require("../db");

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

    return ConversionTunnel;
};