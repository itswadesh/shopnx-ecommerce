'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BrandSchema = new Schema({
  name: String,
  info: String,
  parent: Number,
  image: String,
  uid: Number,
  active: Boolean
});

module.exports = mongoose.model('Brand', BrandSchema);
