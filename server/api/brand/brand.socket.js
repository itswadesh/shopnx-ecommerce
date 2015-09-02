/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Brand = require('./brand.model');

exports.register = function(socket) {
  Brand.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Brand.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('brand:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('brand:remove', doc);
}