module.exports = (connection) => {
  const { DataTypes, Model } = require("sequelize");

  class ConversionTunnelTag extends Model {
  }

  ConversionTunnelTag.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize: connection, tableName: "conversionTunnelTag",
      indexes: [
        { unique: true, fields: ['conversionTunnelId', 'tagId'] },
        { unique: true, fields: ['conversionTunnelId', 'order'] }
      ]
    }
  );

  // TODO contrainte unique sur conversionTunnelId et tagId + supprimer tous les tunnel tags d'un tunnel lors de la suppression du tunnel

  ConversionTunnelTag.associate = (models) => {
    ConversionTunnelTag.belongsTo(models.ConversionTunnel, { foreignKey: "conversionTunnelId" });
    ConversionTunnelTag.belongsTo(models.Tag, { foreignKey: "tagId" });
    ConversionTunnelTag.belongsTo(models.User, { foreignKey: "createdBy" });
  };

  return ConversionTunnelTag;
};
