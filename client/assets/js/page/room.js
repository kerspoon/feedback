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
      }
    });

    // prevent default handler
    return false;
  }

  room.init = function(context) {

    roomId = context.params.id;

    ractive = templates.moveToPage('room', {
      roomId: roomId
    });
    templates.setTopNav('Welcome to class', true);

    // set up event handlers
    var listener = ractive.on({
      sendMessage: onMessage
    });

    jsonPost('room/' + roomId, {
      message: 'joined'
    }, function(err) {
      if (err) {
        alert('failed to send message');
      }
    });

  };

}(window));
