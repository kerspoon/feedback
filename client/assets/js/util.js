(function(exports) {
  'use strict';
  /* jshint browser:true */

  function randomString(len, charSet) {
    charSet = charSet || 'abcdefghijklmnopqrstuvwxyz0123456789';
    var ret = '';
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      ret += charSet.substring(randomPoz, randomPoz + 1);
    }
    return ret;
  }

  function pad(n, width, z) {
    // http://stackoverflow.com/a/10073788/57557
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  function xhrFile(name, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/templates/' + name + '.handlebars', true);

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        // everything is good, the response is received
        if (xhr.status >= 200 && xhr.status < 400) {
          // Success!
          callback(null, xhr.responseText);
        } else {
          // We reached our target server, but it returned an error
          callback(true);
        }
      }
    };

    xhr.send();
  }

  exports.randomString = randomString;
  exports.pad = pad;
  exports.xhrFile = xhrFile;

}(window));
