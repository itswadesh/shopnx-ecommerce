'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProductSchema = new Schema({
  sku: String,
  name: String,
  nameLower: String,
  slug: String,
  category: String,
  status: String,
  brand: String,
  info: String,
  uid: String,
  variants: Array,
  active: { type: Boolean, default: false },
  updated: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Product', ProductSchema);
