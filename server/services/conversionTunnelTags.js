const { ConversionTunnelTag, User } = require("../db");
const Sequelize = require("sequelize");
const ValidationError = require("../errors/ValidationError");

module.exports = function TagService() {
  return {
    findAll: async function(filters, options) {
      let dbOptions = {
        where: filters,
        include: [User]
      };
      // options.order = {name: "ASC", dob: "DESC"}
      if (options?.order) {
        // => [["name", "ASC"], ["dob", "DESC"]]
        dbOptions.order = Object.entries(options.order);
      }
      if (options?.limit) {
        dbOptions.limit = options.limit;
        dbOptions.offset = options?.offset;
      }
      return ConversionTunnelTag.findAll(dbOptions);
    },
    findOne: async function(filters) {
      return ConversionTunnelTag.findOne({
        where: filters,
        include: [User]
      });
    },
    create: async function(data) {
      try {
        return await ConversionTunnelTag.create(data);
      } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
          throw ValidationError.fromSequelizeValidationError(e);
        }
        throw e;
      }
    },
    replace: async function(filters, newData) {
      try {
        const nbDeleted = await this.delete(filters);
        const user = await this.create(newData);
        return [[user, nbDeleted === 0]];
      } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
          throw ValidationError.fromSequelizeValidationError(e);
        }
        throw e;
      }
    },
    update: async (filters, newData) => {
      try {
        const [nbUpdated, users] = await ConversionTunnelTag.update(newData, {
          where: filters,
          returning: true,
          individualHooks: true
        });

        return users;
      } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
          throw ValidationError.fromSequelizeValidationError(e);
        }
        throw e;
      }
    },
    delete: async (filters) => {
      return ConversionTunnelTag.destroy({ where: filters });
    }
  };
};
