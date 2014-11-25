

var timer = document.getElementsByClassName("js-timer")[0];
var start = new Date();

function pad(n, width, z) {
  // http://stackoverflow.com/a/10073788/57557
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

setInterval(function(){
  var now = new Date();
  var interval = moment.duration(moment(now).diff(start));

  var minutes = pad(interval.get("minutes"), 2);
  var seconds = pad(interval.get("seconds"), 2);

  if (interval.get("hours") === 0) {
    timer.innerHTML = minutes +":"+ seconds;
  } else {
    var hours = pad(interval.get("hours"), 2);
    timer.innerHTML = hours +":"+ minutes +":"+ seconds;
  }

}, 1000);

