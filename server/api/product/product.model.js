'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
  sku: String,
  name: String,
  name_lower: String,
  slug: String,
  category: String,
  status: String,
  brand: String,
  info: String,
  uid: String,
  variants: [],
  active: { type: Boolean, default: false },
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Product', ProductSchema);
