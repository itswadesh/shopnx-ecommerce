/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Feature = require('./feature.model');

exports.register = function(socket) {
  Feature.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Feature.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('feature:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('feature:remove', doc);
}