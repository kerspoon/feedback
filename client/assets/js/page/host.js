(function(exports) {
  'use strict';
  /* jshint browser:true */

  var host = {};
  exports.host = host;


  /*
   * The duration between two `Date` objects, e.g. 00:14
   */
  function getDurationString(from, to) {
    var interval = moment.duration(moment(now).diff(start));
    var minutes = pad(interval.get("minutes"), 2);
    var seconds = pad(interval.get("seconds"), 2);

    if (interval.get("hours") === 0) {
      return minutes + ":" + seconds;
    } else {
      var hours = pad(interval.get("hours"), 2);
      return hours + ":" + minutes + ":" + seconds;
    }
  }


  host.init = function() {

    var roomId = randomString(4);
    var start = new Date();

    var ractive = templates.moveToPage('host', {
      roomId: roomId,
      timer: '00:00'
    });

    templates.setTopNav('Host a Class', true);

    setInterval(function() {
      ractive.set('timer', getDurationString(start, new Date()));
    }, 1000);
  };

}(window));
