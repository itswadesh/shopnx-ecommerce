'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OrderSchema = new Schema({
  orderNo: String,
  name: String,
  slug: String,
  info: String,
  uid: String,
  email: String,
  address: String,
  city: String,
  phone: String,
  payment: String,
  active: { type: Boolean, default: true },
  updated: {type: Date},
  orderDate: {type: Date, default: Date.now},
  status: {type: Object, default: {name: 'Order Placed', val: 201}},
  items: [{ sku: String, name: String, packing: String, quantity: String, mrp: String, price: String, image: String, category: String }]
});

module.exports = mongoose.model('Order', OrderSchema);
