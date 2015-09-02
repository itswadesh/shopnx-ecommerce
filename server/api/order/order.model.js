'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
  order_no: String,
  name: String,
  slug: String,
  info: String,
  active: Boolean,
  uid: Number,
  email: String,
  address: String,
  city: String,
  phone: String,
  created: Date,
  items: [{ sku: String, packing: String, quantity: String, mrp: String, price: String, image: String, category: String }]
});

module.exports = mongoose.model('Order', OrderSchema);
