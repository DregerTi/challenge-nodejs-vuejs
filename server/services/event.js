const Event = require('../mongodb/models/event');
const { Sequelize } = require("sequelize");
const { fromSequelizeValidationError } = require("../errors/ValidationError");

module.exports = function EventService() {
  return {
    findAll: async function (query, fields, options) {
      // return all events with a siteId equals to query.siteId
      return Event.find(query)
        .limit(options.limit)
        .skip(options.skip);
    },
    create: async function (data) {
      // create a new event
      try {
        return Event.create(data);
      } catch (e) {
        throw e;
      }
    },
    countDocuments: async function(filter, options) {
      return Event.countDocuments(filter, options);
    },
    findAllAggregate: async function(aggregate) {
      return Event.aggregate(aggregate);
    }
  }
}