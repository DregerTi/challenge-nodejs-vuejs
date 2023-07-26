const { Model, DataTypes } = require("sequelize");
module.exports = (connection) => {
  const { DataTypes, Model } = require("sequelize");

  class DashboardItem extends Model {
  }

  DashboardItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      kpi: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
          isIn: {
            args: [["bounceRate", "conversionRate", "pageViews", "sessions", "users"]],
            msg: "kpi must be one of the following: bounceRate, conversionRate, pageViews, sessions, users"
          },
        }
      },
    },
    {
      sequelize: connection, tableName: "dashboardItem",
      indexes: [{
        unique: true, fields: ["kpi", "siteId"],
        msg: "This kpi already exists for this site"
      }]
    }
  );

  DashboardItem.associate = (models) => {
    DashboardItem.belongsTo(models.Site, { foreignKey: "siteId" });
    DashboardItem.belongsTo(models.Tag, { foreignKey: "tagId" });
    DashboardItem.belongsTo(models.ConversionTunnel, { foreignKey: "conversionTunnelId" });
  };

  return DashboardItem;
};