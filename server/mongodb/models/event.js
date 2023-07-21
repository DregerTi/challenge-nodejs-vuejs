const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Event = new Schema({
  siteId: {
    type: String,
    ref: 'Site',
    required: true
  },
  viewerId: {
    type: String,
    ref: 'Viewer',
    required: true
  },
  sessionId: {
    type: String,
    ref: 'Session',
    required: true
  },
  tagId: {
    type: String,
    ref: 'Tag',
    required: true
  },
  path: {
    type: String,
    required: true
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  type: {
    type: String,
    required: true
  },
  ip: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});
console.log('trop cool');
module.exports = mongoose.model('Event', Event);