'use strict';

var _ = require('lodash');
var Shipping = require('./shipping.model');
function isJson(str) {
  try {
      str = JSON.parse(str);
  } catch (e) {
      str = str;
  }
  return str
}
// Get all features group
exports.best = function(req, res) {
  var q = isJson(req.query);
  Shipping.find(q, function (err, shippings) {
    if(err) { return handleError(res, err); }
    var minCharge = 1000;
    var carrier = {};
    for (var i = 0; i < shippings.length; i++) {
      if(shippings[i].charge < minCharge){
        minCharge = shippings[i].charge;
        carrier = shippings[i];
      }
    }
      // console.log(carrier);
    // if(shippings.length===0){
    //   minCharge = 0;
    // }
    // async.each(shippings, function(k, callback){
    //   console.log(k);
    // });
    // console.log(shippings);
    return res.status(200).json([carrier]);
  });
};

// Get list of shippings
exports.index = function(req, res) {
  Shipping.find(function (err, shippings) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(shippings);
  });
};

// Get a single shipping
exports.show = function(req, res) {
  Shipping.findById(req.params.id, function (err, shipping) {
    if(err) { return handleError(res, err); }
    if(!shipping) { return res.status(404).send('Not Found'); }
    return res.json(shipping);
  });
};

// Creates a new shipping in the DB.
exports.create = function(req, res) {
  Shipping.create(req.body, function(err, shipping) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(shipping);
  });
};

// Updates an existing shipping in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Shipping.findById(req.params.id, function (err, shipping) {
    if (err) { return handleError(res, err); }
    if(!shipping) { return res.status(404).send('Not Found'); }
    var updated = _.merge(shipping, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(shipping);
    });
  });
};

// Deletes a shipping from the DB.
exports.destroy = function(req, res) {
  Shipping.findById(req.params.id, function (err, shipping) {
    if(err) { return handleError(res, err); }
    if(!shipping) { return res.status(404).send('Not Found'); }
    shipping.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
