(function(exports) {
  'use strict';
  /* jshint browser:true */
  /* global jsonPost:false, templates:false, page:false */

  var room = {};
  exports.room = room;

  var roomId;
  var ractive;
  var userId;

  function sendMessage(type, message, callback) {
    jsonPost('room/' + roomId, {
      userId: userId,
      message: message,
      type: type
    }, callback);
  }

  function onMessage() {

    var message = ractive.get('message');

    // don't send empty messages
    if (message.trim().length === 0) {
      return false;
    }

    sendMessage('chat', message, function(err) {
      if (err) {
        alert('failed to send message');
      } else {
        ractive.set('message', '');
      }
    });

    // prevent default handler
    return false;
  }

  function onConfused() {
    sendMessage('confused', '', function(err) {
      if (err) {
        alert('failed to send message');
      }
    });
    // prevent default handler
    return false;
  }

  function onHappinessChanged(happiness) {
    if (happiness >=0 && happiness <= 100) {
      sendMessage('happiness', happiness, function(err) {
        if (err) {
          alert('failed to send message');
        }
      });
    }

    // prevent default handler
    return false;
  }


  function onJoined(roomId) {
    ractive = templates.moveToPage('room', {
      roomId: roomId
    });

    // set up event handlers
    ractive.on({
      sendMessage: onMessage,
      sendConfused: onConfused
    });

    // don't spam the world by sending messages, only send the new value.
    ractive.observe('happiness', _.debounce(onHappinessChanged, 1000));

    templates.setTopNav('Welcome to class', true);
  }

  room.init = function(context) {

    roomId = context.params.id;
    userId = randomString(10);

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
