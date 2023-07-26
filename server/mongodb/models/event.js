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
  },
  path: {
    type: String,
    required: true
  },
  country: {
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
  coordinates: {
    x: {
      type: Number,
    },
    y: {
      type: Number,
    }
  },
  size: {
    type: String,
  },
  system: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});
module.exports = mongoose.model('Event', Event);