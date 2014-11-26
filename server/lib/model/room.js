'use strict';
/* jshint node:true */

var _ = require('underscore');
var WebError = require('../error').WebError;

var rooms = {};

exports.getAll = function(callback) {
  return callback(null, rooms);
};

exports.create = function(obj, callback) {
  if (rooms[obj.id]) {
    return callback(new WebError(409, 'already exists'));
  } else {
    rooms[obj.id] = obj;
    return callback(null, obj.id);
  }
};

exports.get = function(id, callback) {
  if (rooms[id]) {
    return callback(null, rooms[id]);
  } else {
    return callback(new WebError(404, 'not found'));
  }
};

exports.update = function(id, obj, callback) {
  if (rooms[id]) {
    _.extend(rooms[id], obj);
    return callback(null);
  } else {
    return callback(new WebError(404, 'not found'));
  }
};

exports.delete = function(id, callback) {
  if (rooms[id]) {
    rooms[id] = undefined;
    return callback(null);
  } else {
    return callback(new WebError(404, 'not found'));
  }
};
