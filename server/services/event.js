const Event = require('../mongodb/models/event');

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
      return Event.create(data);
    },
    countDocuments: async function(filter, options) {
      return Event.countDocuments(filter, options);
    }
  }
}