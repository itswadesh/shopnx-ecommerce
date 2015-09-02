'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BrandSchema = new Schema({
  name: String,
  slug: String,
  info: String,
  parent: String,
  image: String,
  uid: String,
  active: { type: Boolean, default: false },
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Brand', BrandSchema);
