module.exports = (connection) => {
  const { DataTypes, Model } = require("sequelize");
  class ConversionTunnelTag extends Model {}

  ConversionTunnelTag.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
    },
    { sequelize: connection, tableName: "conversionTunnelTag" }
  );

  ConversionTunnelTag.associate = (models) => {
    ConversionTunnelTag.belongsTo(models.ConversionTunnel, { foreignKey: 'conversionTunnelId' })
    ConversionTunnelTag.belongsTo(models.Tag, { foreignKey: 'tagId' });
    ConversionTunnelTag.belongsTo(models.User, { foreignKey: 'createdBy' });
  }

  return ConversionTunnelTag;
};
