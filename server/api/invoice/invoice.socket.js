/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Invoice = require('./invoice.model');

exports.register = function(socket) {
  Invoice.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Invoice.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('invoice:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('invoice:remove', doc);
}