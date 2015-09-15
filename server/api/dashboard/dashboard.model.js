'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DashboardSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Dashboard', DashboardSchema);
