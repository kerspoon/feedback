

function randomString(len, charSet) {
    charSet = charSet || 'abcdefghijklmnopqrstuvwxyz0123456789';
    var ret = '';
    for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      ret += charSet.substring(randomPoz,randomPoz+1);
    }
    return ret;
}



var roomId = document.getElementsByClassName("js-room-id")[0];

roomId.innerText = randomString(4);
