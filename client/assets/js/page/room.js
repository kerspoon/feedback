(function(exports) {
  'use strict';
  /* jshint browser:true */

  var room = {};
  exports.room = room;

  room.init = function(context) {

    var ractive = templates.moveToPage('room', {
      roomId: context.params.id
    });
    templates.setTopNav('Welcome to class', true);

  };

}(window));
