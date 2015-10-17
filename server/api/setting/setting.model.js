'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SettingsSchema = new Schema({
  minOrderValue: Number,
  shippingCharge: Number
});

module.exports = mongoose.model('Settings', SettingsSchema);
