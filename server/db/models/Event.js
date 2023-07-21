const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  // ... mettre les props 
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
