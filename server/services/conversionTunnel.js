const { ConversionTunnel, User, Site, ConversionTunnelTag, Tag} = require("../db");
const Sequelize = require("sequelize");
const ValidationError = require("../errors/ValidationError");

module.exports = function TagService() {
  return {
    findAll: async function (filters, options) {
      for (const key in filters) {
        if (!["siteId", "name", "tagKey", "createdAt", "updatedAt", "userEmail"].includes(key)) {
          delete filters[key];
        }
      }
      if (filters?.userEmail) {
        filters = {
          ...filters,
          "$User.email$": filters.userEmail,
        };
        delete filters.userEmail;
      }
      let dbOptions = {
        where: filters,
        include: [{
          model: User,
          attributes: ["firstname", "lastname", "email"],
        }]
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
      return ConversionTunnel.findAll(dbOptions);
    },
    findOne: async function (filters) {
      let dbOptions = {
        where: filters,
        include: [{
          model: ConversionTunnelTag,
          attributes: ["id", "order", "tagId", "conversionTunnelId"],
        }]
      };
      return ConversionTunnel.findOne(dbOptions);
    },
    create: async function (data) {
      try {
        return await ConversionTunnel.create(data);
      } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
          throw ValidationError.fromSequelizeValidationError(e);
        }
        throw e;
      }
    },
    replace: async function (filters, newData) {
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
        const [nbUpdated, users] = await ConversionTunnel.update(newData, {
          where: filters,
          returning: true,
          individualHooks: true,
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
      return ConversionTunnel.destroy({ where: filters });
    }
  };
};
