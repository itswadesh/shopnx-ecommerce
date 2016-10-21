'use strict';

var _ = require('lodash');
var Setting = require('./setting.model');

// Get all settings by a user
exports.mySettings = function(req, res) {
  Setting.find({'uid' : req.user.email},function (err, settings) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(settings);
  });
};

// Get list of settings
exports.index = function(req, res) {
  Setting.find(function (err, settings) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(settings);
  });
};

// Get a single setting
exports.show = function(req, res) {
  Setting.findById(req.params.id, function (err, setting) {
    if(err) { return handleError(res, err); }
    if(!setting) { return res.status(404).send('Not Found'); }
    return res.json(setting);
  });
};

// Creates a new setting in the DB.
exports.create = function(req, res) {
  Setting.create(req.body, function(err, setting) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(setting);
  });
};

// Updates an existing setting in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  if(req.body.__v) { delete req.body.__v; }
  req.body.updated = Date.now();
  console.log(req,res);
  Setting.findById(req.params.id, function (err, setting) {
    if (err) { return handleError(res, err); }
    if(!setting) { return res.status(404).send('Not Found'); }
    var updated = _.extend(setting, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(setting);
    });
  });
};

// Deletes a setting from the DB.
exports.destroy = function(req, res) {
  Setting.findById(req.params.id, function (err, setting) {
    if(err) { return handleError(res, err); }
    if(!setting) { return res.status(404).send('Not Found'); }
    setting.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
