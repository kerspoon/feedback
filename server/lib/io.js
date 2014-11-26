'use strict';
/* jshint node:true */

var roomController = require('./controller/room');


exports.sendMessage = function(roomId, message, callback) {
  roomController.get(roomId, function(err, roomObj) {
    if (!err) {
      if (roomObj && roomObj.socket) {
        roomObj.socket.emit('message', message);
        return callback(null);
      } else {
        return callback(new Error('cannot get owner for room'));
      }
    } else {
      return callback(err);
    }
  });
};

exports.init = function(http) {

  var io = require('socket.io')(http);

  io.on('connection', function(socket){
    console.log('=> connection');

    socket.on('disconnect', function(){
      console.log('=> disconnect');
    });

    socket.on('create', function(roomId){
      console.log('=> create', roomId);

      // set room owner so we can message them later.
      roomController.create({
        id: roomId,
        socket: socket
      }, function(err) {
        if (err) {
          socket.emit('error', err.clientMessage || 'An error has occurred');
        } else {
          // tell the owner that we are ready to go.
          socket.emit('created', roomId);
        }
      });
    });
  });
};
