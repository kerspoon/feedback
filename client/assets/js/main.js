function xhrFile(name, callback) {
  xhr = new XMLHttpRequest();
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
    } else {
      // still not ready
    }
  };

  xhr.send();
}

function onClassClick(className, func) {
  _.map(document.getElementsByClassName(className), function(el) {
    el.addEventListener('click', func);
  });
}



function randomString(len, charSet) {
    charSet = charSet || 'abcdefghijklmnopqrstuvwxyz0123456789';
    var ret = '';
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      ret += charSet.substring(randomPoz,randomPoz+1);
    }
    return ret;
}

function pad(n, width, z) {
  // http://stackoverflow.com/a/10073788/57557
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

var templates = {};
var pageInit = {};

pageInit.join = function() {
  var ractive = moveToPage('join');
};

pageInit.host = function() {

  var start = new Date();

  var ractive = moveToPage('host', {
    roomId: randomString(4),
    timer: '00:00'
  });

  setInterval( function () {
    var now = new Date();
    var interval = moment.duration(moment(now).diff(start));

    var minutes = pad(interval.get("minutes"), 2);
    var seconds = pad(interval.get("seconds"), 2);

    var timer;

    if (interval.get("hours") === 0) {
      timer = minutes +":"+ seconds;
    } else {
      var hours = pad(interval.get("hours"), 2);
      timer = hours +":"+ minutes +":"+ seconds;
    }

    ractive.set('timer', timer);
  }, 1000 );
};


function fetchTemplate(name, callback) {
  xhrFile(name, function(err, template) {
    if (!err) {
      templates[name] = template;
    }
    return callback(err);
  });
}


function moveToPage(templateName, data) {
  return new Ractive({
    el: '.content',
    template: templates[templateName],
    data: data
  });
}


window.addEventListener('load', function() {

  async.mapSeries(['host', 'join'], fetchTemplate, function(err, results) {
  //fetchTemplate('join', function(err, results) {
    if (err) {
      document.write('error');
      debugger;
    } else {
      onClassClick('js-page-join', pageInit.join);
      onClassClick('js-page-host', pageInit.host);
    }
  });
});
