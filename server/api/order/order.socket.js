/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Order = require('./order.model');

exports.register = function(socket) {
  Order.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Order.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('order:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('order:remove', doc);
}