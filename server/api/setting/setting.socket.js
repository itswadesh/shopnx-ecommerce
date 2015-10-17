/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var setting = require('./setting.model');

exports.register = function(socket) {
  setting.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  setting.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('setting:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('setting:remove', doc);
}
