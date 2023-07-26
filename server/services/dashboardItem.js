const { DashboardItem } = require('../db');
const Sequelize = require('sequelize');
const ValidationError = require('../errors/ValidationError');

module.exports = function DashboardItemService() {
  return {
    findAll: async function (filters) {
      return DashboardItem.findAll({ where: filters });
    },
    addByKpi: async function (kpi, siteId, tagId, conversionTunnelId) {
      try {
        return await DashboardItem.create({ kpi, siteId, tagId, conversionTunnelId });
      } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
          throw ValidationError.fromSequelizeValidationError(e);
        }
        throw e;
      }
    },
    removeByKpi: async function (kpi, siteId) {
      return DashboardItem.destroy({ where: { kpi, siteId } });
    }
  }
}