'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
  slug: String,
  info: String,
  parent: String,
  image: String,
  uid: Number,
  created: Date,
  active: Boolean,
  sub_categories: [{}]
});

module.exports = mongoose.model('Category', CategorySchema);
