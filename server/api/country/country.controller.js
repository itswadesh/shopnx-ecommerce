'use strict';

var _ = require('lodash');
var Country = require('./country.model');

// Get list of countrys
exports.index = function(req, res) {
  Country.find(function (err, countrys) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(countrys);
  });
};

// Get a single country
exports.show = function(req, res) {
  Country.findById(req.params.id, function (err, country) {
    if(err) { return handleError(res, err); }
    if(!country) { return res.status(404).send('Not Found'); }
    return res.json(country);
  });
};

// Creates a new country in the DB.
exports.create = function(req, res) {
  Country.create(req.body, function(err, country) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(country);
  });
};

// Updates an existing country in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Country.findById(req.params.id, function (err, country) {
    if (err) { return handleError(res, err); }
    if(!country) { return res.status(404).send('Not Found'); }
    var updated = _.merge(country, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(country);
    });
  });
};

// Deletes a country from the DB.
exports.destroy = function(req, res) {
  Country.findById(req.params.id, function (err, country) {
    if(err) { return handleError(res, err); }
    if(!country) { return res.status(404).send('Not Found'); }
    country.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
