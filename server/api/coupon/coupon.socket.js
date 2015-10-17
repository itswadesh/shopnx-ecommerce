/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Coupon = require('./coupon.model');

exports.register = function(socket) {
  Coupon.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Coupon.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('coupon:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('coupon:remove', doc);
}