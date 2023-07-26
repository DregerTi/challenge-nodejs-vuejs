const { Model, DataTypes } = require("sequelize");
const dashboardUtil = require("../../utils/dashboard-utils");
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
            args: [["pageView",
              "totalUsers",
              "newUsers",
              "sessions",
              "oneTag", "conversionTunnel", "avgTimeBySession",
              "activeUsers",
              "viewerByCountry",
              "viewerByOs",]],
            msg: "kpi must be one of the following: pageView, totalUsers, newUsers, sessions, oneTag, " +
              "conversionTunnel, avgTimeBySession activeUsers viewerByCountry viewerByOs"
          }
        }
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      }
    },
    {
      sequelize: connection, tableName: "dashboardItem"
    }
  );

  DashboardItem.associate = (models) => {
    DashboardItem.belongsTo(models.Site, { foreignKey: "siteId" });
    DashboardItem.belongsTo(models.Tag, { foreignKey: "tagId" });
    DashboardItem.belongsTo(models.ConversionTunnel, { foreignKey: "conversionTunnelId" });
  };

  return DashboardItem;
};