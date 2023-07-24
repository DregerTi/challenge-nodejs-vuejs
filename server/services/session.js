const {Session, Viewer, Site } = require('../db');
const Sequelize = require('sequelize');
const ValidationError = require('../errors/ValidationError');

module.exports = function SessionService() {
  return {
    findAll: async function (filters, options) {
      for (const key in filters) {
        if (!['sessionKey', 'device', 'stoppedAt', 'createdAt', 'viewerId'].includes(key)) {
          delete filters[key];
        }
      }
      let showViewer = true;
      if (filters?.viewerId) {
        filters = {
          ...filters,
          '$Viewer.id$': filters.viewerId,
        };
        delete filters.viewerId;
        showViewer = false;
      }
      let dbOptions = {
        where: filters,
        subQuery: false,
        include: [{
          model: Viewer,
        }],
      };
      if (!showViewer) {
        dbOptions.include[0].attributes = [];
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
      return Session.findAll(dbOptions);
    },
    findOne: async function (filters, order) {
      return Session.findOne({
        where: filters,
        order: order,
      });
    },
    create: async function (data) {
      try {
        return await Session.create(data);
      } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
          throw ValidationError.fromSequelizeValidationError(e);
        }
        throw e;
      }
    },
    update: async function (filters, newData) {
      try {
        const [nbUpdated, session] = await Session.update(newData, {
          where: filters,
          returning: true,
          individualHooks: true,
        });

        return session;
      } catch (e) {
        if (e instanceof Sequelize.ValidationError) {
          throw ValidationError.fromSequelizeValidationError(e);
        }
        throw e;
      }
    }
  }
}