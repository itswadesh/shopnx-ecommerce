'use strict';

var _ = require('lodash');
var Coupon = require('./coupon.model');

function isJson(str) {
  try {
      str = JSON.parse(str);
  } catch (e) {
      str = str;
  }
  return str
}

// Get list of coupons
exports.index = function(req, res) {
  var q = isJson(req.query.where);
  // console.log(q);
  Coupon.find(q, function (err, coupons) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(coupons);
  });
};

// Get a single coupon
exports.show = function(req, res) {
  Coupon.findById(req.params.id, function (err, coupon) {
    if(err) { return handleError(res, err); }
    if(!coupon) { return res.status(404).send('Not Found'); }
    return res.json(coupon);
  });
};

// Creates a new coupon in the DB.
exports.create = function(req, res) {
  Coupon.create(req.body, function(err, coupon) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(coupon);
  });
};

// Updates an existing coupon in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Coupon.findById(req.params.id, function (err, coupon) {
    if (err) { return handleError(res, err); }
    if(!coupon) { return res.status(404).send('Not Found'); }
    var updated = _.merge(coupon, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(coupon);
    });
  });
};

// Deletes a coupon from the DB.
exports.destroy = function(req, res) {
  Coupon.findById(req.params.id, function (err, coupon) {
    if(err) { return handleError(res, err); }
    if(!coupon) { return res.status(404).send('Not Found'); }
    coupon.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
