(function(exports) {
  'use strict';
  /* jshint browser:true */

  window.addEventListener('load', function() {

    var tmplArr = ['room', 'index', 'host', 'join', 'nav'];

    templates.init(tmplArr, function(err, results) {
      if (err) {
        alert('error loading templates ' + err);
      } else {

        page('/', index.init);
        page('/join', join.init);
        page('/room/:id', room.init);
        page('/host', host.init);

        page();
      }
    });

  });
}(window));
