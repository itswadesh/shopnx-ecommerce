'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
  slug: String,
  info: String,
  parentCategory: Number,
  image: String,
  uid: String,
  category: Number,
  active: { type: Boolean, default: true },
  updated: {type: Date, default: Date.now},
  sub_categories: [{}]
});

module.exports = mongoose.model('Category', CategorySchema);
