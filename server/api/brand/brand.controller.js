'use strict';

var _ = require('lodash');
var Brand = require('./brand.model');

// Get list of brands
exports.index = function(req, res) {
  Brand.find(function (err, brands) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(brands);
  });
};

// Get a single brand
exports.show = function(req, res) {
  Brand.findById(req.params.id, function (err, brand) {
    if(err) { return handleError(res, err); }
    if(!brand) { return res.status(404).send('Not Found'); }
    return res.json(brand);
  });
};

// Creates a new brand in the DB.
exports.create = function(req, res) {
  Brand.create(req.body, function(err, brand) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(brand);
  });
};

// Updates an existing brand in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Brand.findById(req.params.id, function (err, brand) {
    if (err) { return handleError(res, err); }
    if(!brand) { return res.status(404).send('Not Found'); }
    var updated = _.merge(brand, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(brand);
    });
  });
};

// Deletes a brand from the DB.
exports.destroy = function(req, res) {
  Brand.findById(req.params.id, function (err, brand) {
    if(err) { return handleError(res, err); }
    if(!brand) { return res.status(404).send('Not Found'); }
    brand.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}