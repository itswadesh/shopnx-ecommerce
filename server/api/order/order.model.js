'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
  order_no: String,
  name: String,
  slug: String,
  info: String,
  uid: Number,
  email: String,
  address: String,
  city: String,
  phone: String,
  active: { type: Boolean, default: false },
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now},
  items: [{ sku: String, packing: String, quantity: String, mrp: String, price: String, image: String, category: String }]
});

module.exports = mongoose.model('Order', OrderSchema);
