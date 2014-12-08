(function (exports) {
  'use strict';
  /* jshint browser:true */
  /* global _:false, jsonPost:false, templates:false, page:false */

  var room = {};
  exports.room = room;

  var roomId;
  var ractive;

  function onMessage() {

    var message = ractive.get('message');

    // don't send empty messages
    if (message.trim().length === 0) {
      return false;
    }

    jsonPost('room/' + roomId, {
      message: message
    }, function (err) {
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
    console.log('onConfused');
    // prevent default handler
    return false;
  }

  function onHappinessChanged(happiness) {
    console.log('onHappinessChanged', happiness);

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

    ractive.observe('happiness', function (newValue) {
      _.throttle(_.partial(onHappinessChanged, newValue), 100);
    });

    templates.setTopNav('Welcome to class', true);
  }

  room.init = function (context) {

    roomId = context.params.id;

    jsonPost('room/' + roomId, {
      message: 'joined'
    }, function (err) {
      if (err) {
        alert('failed to join room', err);
        page('/join');
      } else {
        onJoined(roomId);
      }
    });
  };

}(window));