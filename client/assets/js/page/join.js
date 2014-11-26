(function(exports) {
  'use strict';
  /* jshint browser:true */

  var join = {};
  exports.join = join;

  var ractive, listener;

  function onJoin() {
    // go to the room
    page('/room/' + ractive.get( 'roomId' ));
    // prevent default handler
    return false;
  }

  join.init = function() {

    ractive = templates.moveToPage('join');
    templates.setTopNav('Join a Class', true);

    // set up event handlers
    listener = ractive.on({
      join: onJoin
    });

  };

}(window));
