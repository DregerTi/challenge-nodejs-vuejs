const { Session, Viewer } = require("../db");
const Sequelize = require("sequelize");
const ValidationError = require("../errors/ValidationError");

module.exports = function ViewerService() {
  return {
    findAll: async function(filters, options) {
      for (const key in filters) {
        if (!["viewerKey"].includes(key)) {
          delete filters[key];
        }
      }
      // options.order = {name: 'ASC', dob: 'DESC'}
      if (options?.order) {
        // => [['name', 'ASC'], ['dob', 'DESC']]
        dbOptions.order = Object.entries(options.order);
      }
      if (options?.limit) {
        dbOptions.limit = options.limit;
        dbOptions.offset = options?.offset;
      }
      return Viewer.findAll(dbOptions);
    },
    findOne: async function(filters) {
      return Viewer.findOne({ where: filters });
    },
    create: async function(data) {
      try {
        return await Viewer.create(data);
      } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
          throw ValidationError.fromSequelizeValidationError(e);
        }
        throw e;
      }
    },
    update: async function(filters, newData) {
      try {
        return await Viewer.update(newData, { where: filters });
      } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
          throw ValidationError.fromSequelizeValidationError(e);
        }
        throw e;
      }
    }
  };
};