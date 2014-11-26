(function(exports) {
  'use strict';
  /* jshint browser:true */

  var index = {};
  exports.index = index;

  index.init = function() {

    var ractive = templates.moveToPage('index');
    templates.setTopNav('Workshop Feedback', false);

  };

}(window));
