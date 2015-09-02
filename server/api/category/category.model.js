'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
  slug: String,
  info: String,
  parent: String,
  image: String,
  uid: String,
  active: { type: Boolean, default: false },
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now},
  sub_categories: [{}]
});

module.exports = mongoose.model('Category', CategorySchema);
