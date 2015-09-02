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
  uid: Number,
  created: Date,
  variants: [],
  active: Boolean
});

module.exports = mongoose.model('Product', ProductSchema);
