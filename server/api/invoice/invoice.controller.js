'use strict';

var _ = require('lodash');
var Invoice = require('./invoice.model');

// Get list of invoices
exports.index = function(req, res) {
  Invoice.find(function (err, invoices) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(invoices);
  });
};

// Get a single invoice
exports.show = function(req, res) {
  Invoice.findById(req.params.id, function (err, invoice) {
    if(err) { return handleError(res, err); }
    if(!invoice) { return res.status(404).send('Not Found'); }
    return res.json(invoice);
  });
};

// Creates a new invoice in the DB.
exports.create = function(req, res) {
  Invoice.create(req.body, function(err, invoice) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(invoice);
  });
};

// Updates an existing invoice in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Invoice.findById(req.params.id, function (err, invoice) {
    if (err) { return handleError(res, err); }
    if(!invoice) { return res.status(404).send('Not Found'); }
    var updated = _.extend(invoice, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(invoice);
    });
  });
};

// Deletes a invoice from the DB.
exports.destroy = function(req, res) {
  Invoice.findById(req.params.id, function (err, invoice) {
    if(err) { return handleError(res, err); }
    if(!invoice) { return res.status(404).send('Not Found'); }
    invoice.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
