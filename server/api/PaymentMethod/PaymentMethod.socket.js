/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var PaymentMethod = require('./PaymentMethod.model');

exports.register = function(socket) {
  PaymentMethod.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  PaymentMethod.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('PaymentMethod:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('PaymentMethod:remove', doc);
}