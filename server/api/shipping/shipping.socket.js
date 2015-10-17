/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Shipping = require('./shipping.model');

exports.register = function(socket) {
  Shipping.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Shipping.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('shipping:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('shipping:remove', doc);
}