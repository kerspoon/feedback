(function(exports) {
  'use strict';
  /* jshint browser:true */

  var host = {};
  exports.host = host;

  var messages = [
    'Welcome to your room. Students messages will appear here.'
  ];

  /*
   * The duration between two `Date` objects, e.g. 00:14
   */
  function getDurationString(from, to) {
    var interval = moment.duration(moment(to).diff(from));
    var minutes = pad(interval.get("minutes"), 2);
    var seconds = pad(interval.get("seconds"), 2);

    if (interval.get("hours") === 0) {
      return minutes + ":" + seconds;
    } else {
      var hours = pad(interval.get("hours"), 2);
      return hours + ":" + minutes + ":" + seconds;
    }
  }

  function onMessage(message) {
    messages.push(message);
  }

  function onCreated(roomId) {

    // start the timer
    var start = new Date();

    // show the new page
    var ractive = templates.moveToPage('host', {
      roomId: roomId,
      timer: '00:00',
      messages: messages
    });

    // set the header
    templates.setTopNav('Host a Class', true);

    // every second update the timer
    setInterval(function() {
      ractive.set('timer', getDurationString(start, new Date()));
    }, 1000);
  }


  host.init = function() {

    // make up a room ID
    var roomId = randomString(4);

    // start a socket.io connection
    var socket = io();

    socket.on('created', onCreated);
    socket.on('message', onMessage);

    socket.on('error', function(err) {
      alert('failed to create room. ' + err);
    });

    // go create the room on the server
    socket.emit('create', roomId);

  };


}(window));
