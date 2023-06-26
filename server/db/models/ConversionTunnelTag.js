module.exports = (connection) => {
  const { DataTypes, Model } = require("sequelize");
  const ConversionTunnel = require("./ConversionTunnel")(connection);
  const Tag = require("./Tag")(connection);
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

  ConversionTunnelTag.belongsTo(ConversionTunnel, { foreignKey: 'idConversionTunnel' })
  ConversionTunnelTag.belongsTo(Tag, { foreignKey: 'idTag' });

  return ConversionTunnelTag;
};
