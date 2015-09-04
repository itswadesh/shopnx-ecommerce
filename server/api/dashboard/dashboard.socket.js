/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Dashboard = require('./dashboard.model');

exports.register = function(socket) {
  Dashboard.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Dashboard.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('dashboard:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('dashboard:remove', doc);
}