(function(exports) {
  'use strict';
  /* jshint browser:true */

  var room = {};
  exports.room = room;

  var roomId;
  var ractive;

  function onMessage() {

    var message = ractive.get('message');

    jsonPost('room/' + roomId, {
      message: message
    }, function(err) {
      if (err) {
        alert('failed to send message');
      } else {
        ractive.set('message', '');
      }
    });

    // prevent default handler
    return false;
  }


  function onJoined(roomId) {
    ractive = templates.moveToPage('room', {
      roomId: roomId
    });

    // set up event handlers
    var listener = ractive.on({
      sendMessage: onMessage
    });

    templates.setTopNav('Welcome to class', true);
  }

  room.init = function(context) {

    roomId = context.params.id;

    jsonPost('room/' + roomId, {
      message: 'joined'
    }, function(err) {
      if (err) {
        alert('failed to join room', err);
        page('/join');
      } else {
        onJoined(roomId);
      }
    });
  };

}(window));
