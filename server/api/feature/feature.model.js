'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FeatureSchema = new Schema({
  key: String,
  val: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Feature', FeatureSchema);
