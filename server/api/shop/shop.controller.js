'use strict';

var _ = require('lodash');
var Shop = require('./shop.model');

// Get list of shops
exports.index = function(req, res) {
  Shop.find(function (err, shops) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(shops);
  });
};

// Get a single shop
exports.show = function(req, res) {
  Shop.findById(req.params.id, function (err, shop) {
    if(err) { return handleError(res, err); }
    if(!shop) { return res.status(404).send('Not Found'); }
    return res.json(shop);
  });
};

// Creates a new shop in the DB.
exports.create = function(req, res) {
  Shop.create(req.body, function(err, shop) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(shop);
  });
};

// Updates an existing shop in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Shop.findById(req.params.id, function (err, shop) {
    if (err) { return handleError(res, err); }
    if(!shop) { return res.status(404).send('Not Found'); }
    var updated = _.merge(shop, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(shop);
    });
  });
};

// Deletes a shop from the DB.
exports.destroy = function(req, res) {
  Shop.findById(req.params.id, function (err, shop) {
    if(err) { return handleError(res, err); }
    if(!shop) { return res.status(404).send('Not Found'); }
    shop.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
