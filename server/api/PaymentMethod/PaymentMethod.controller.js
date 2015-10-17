'use strict';

var _ = require('lodash');
var PaymentMethod = require('./PaymentMethod.model');

// Get list of active PaymentMethods
exports.active = function(req, res) {
  PaymentMethod.find({active:true}).exec(function (err, PaymentMethods) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(PaymentMethods);
  });
};

// Get list of PaymentMethods
exports.index = function(req, res) {
  PaymentMethod.find().exec(function (err, PaymentMethods) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(PaymentMethods);
  });
};

// Get a single PaymentMethod
exports.show = function(req, res) {
  PaymentMethod.findById(req.params.id, function (err, PaymentMethod) {
    if(err) { return handleError(res, err); }
    if(!PaymentMethod) { return res.status(404).send('Not Found'); }
    return res.json(PaymentMethod);
  });
};

// Creates a new PaymentMethod in the DB.
exports.create = function(req, res) {
  PaymentMethod.create(req.body, function(err, PaymentMethod) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(PaymentMethod);
  });
};

// Updates an existing PaymentMethod in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PaymentMethod.findById(req.params.id, function (err, PaymentMethod) {
    if (err) { return handleError(res, err); }
    if(!PaymentMethod) { return res.status(404).send('Not Found'); }
    var updated = _.merge(PaymentMethod, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(PaymentMethod);
    });
  });
};

// Deletes a PaymentMethod from the DB.
exports.destroy = function(req, res) {
  PaymentMethod.findById(req.params.id, function (err, PaymentMethod) {
    if(err) { return handleError(res, err); }
    if(!PaymentMethod) { return res.status(404).send('Not Found'); }
    PaymentMethod.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
