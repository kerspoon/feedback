(function(exports) {
  'use strict';
  /* jshint browser:true */

  window.addEventListener('load', function() {

    templates.init(['index', 'host', 'join', 'nav'], function(err, results) {
      if (err) {
        alert('error loading templates ' + err);
      } else {

        page('/', index.init);
        page('/join', join.init);
        page('/host', host.init);

        page();
      }
    });

  });
}(window));
