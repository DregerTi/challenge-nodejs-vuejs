const { DashboardItem, UntrackPath } = require("../db");
const Sequelize = require("sequelize");
const ValidationError = require("../errors/ValidationError");

module.exports = function DashboardItemService() {
  return {
    findAll: async function(filters) {
      return DashboardItem.findAll({ where: filters });
    },
    addByKpi: async function(kpi, siteId, tagId, conversionTunnelId, name) {
      try {
        return await DashboardItem.create({ kpi, siteId, tagId, conversionTunnelId, name });
      } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
          throw ValidationError.fromSequelizeValidationError(e);
        }
        throw e;
      }
    },
    removeById: async function(id) {
      return DashboardItem.destroy({ where: { id: id } });
    },
    update: async (filters, newData) => {
      try {
        const [nbUpdated, items] = await DashboardItem.update(newData, {
          where: filters,
          returning: true,
          individualHooks: true
        });

        return items;
      } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
          throw ValidationError.fromSequelizeValidationError(e);
        }
        throw e;
      }
    }
  };
};