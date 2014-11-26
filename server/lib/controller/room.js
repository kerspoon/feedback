'use strict';
/* jshint node:true */

var _ = require('underscore');
var roomModel = require('../model/room');
var io = require('../io');

exports.getAll = function(callback) {
  return roomModel.getAll(callback);
};

exports.create = function(obj, callback) {
  return roomModel.create(obj, callback);
};

exports.get = function(id, callback) {
  return roomModel.get(id, callback);
};

exports.update = function(obj, callback) {
  return roomModel.update(obj.id, obj, callback);
};

exports.delete = function(id, callback) {
  return roomModel.delete(id, callback);
};

exports.message = function(msgObj, callback) {
  io.sendMessage(msgObj.id, msgObj.message, callback);
};
