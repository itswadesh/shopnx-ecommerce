'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BrandSchema = new Schema({
  name: String,
  slug: String,
  info: String,
  parent: Number,
  image: String,
  uid: Number,
  active: Boolean,
  created: Date
});

module.exports = mongoose.model('Brand', BrandSchema);
