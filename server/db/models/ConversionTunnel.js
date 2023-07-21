module.exports = (connection) => {
  const { DataTypes, Model } = require("sequelize");

  class ConversionTunnel extends Model {
  }

  ConversionTunnel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
          len: {
            args: [1, 32],
            msg: "Name must be between 1 and 32 characters long"
          }
        }
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize: connection, tableName: "conversionTunnel",
      indexes: [{
        unique: true, fields: ["name", "siteId"],
        msg: "Name must be unique for a site"
      }]
    }
  );

  ConversionTunnel.associate = (models) => {
    ConversionTunnel.hasMany(models.ConversionTunnelTag, { foreignKey: "conversionTunnelId" });
    ConversionTunnel.belongsTo(models.Site, { foreignKey: "siteId" });
    ConversionTunnel.belongsTo(models.User, { foreignKey: "createdBy" });
  };

  return ConversionTunnel;
};