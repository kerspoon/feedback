'use strict';
/* jshint node:true */


var express = require('express');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var routes = require('./lib/routes');
var path = require('path');

var errorCount = 0;
var app = express();
var clientDir = path.resolve(__dirname + '/../client');

app.use(helmet());

app.use(function(req, res, next) {
  console.log("->", req.method, req.path);
  next();
});

app.use('/', express.static(clientDir));
app.use('/bower_components', express.static(__dirname + '/../bower_components'));


/*
  We accept json hence we should parse it for all routes.
*/
app.use(bodyParser.json());

/*
  define all the routes we want to use.
*/
routes.init(app);


function startsWith(string, start) {
  return string.lastIndexOf(start, 0) === 0;
}


/*
  for page.js return index.html for anything not found.
  this means it will treat `/join` to serve index.html which makes
  the single page app work.
  https://github.com/visionmedia/page.js/blob/master/examples/index.js
*/
app.use(function(req, res, next){
  if (startsWith(req.path, '/api/')) {
    next();
  } else {
    console.log('---', req.path);
    res.sendfile(clientDir + '/index.html');
  }
});


/*
  as this is the last normal route in the list it gets called if there are no
  other routes defined. Hence we can use this as the 404 handler.
  http://stackoverflow.com/questions/6528876
*/
app.use(function(req, res, next){

  if (startsWith(req.path, '/api/')) {
    console.log("----------");
    console.log("route not found");
    console.log(req.method, req.path);
    console.log("----------");
    res.json(404, {msg: 'route not found'});
  } else {
    res.status(404).sendfile(clientDir + '/404.html');
  }
});


/*
  error handling
  As this is a four parameter middleware it catches errors too.
  Most of the time we will throw a WebError that has a basic msg and status
  but we can deal with generic `Error` objects without a status by defaulting
  to a status of 500. And with more complex error objects by letting them
  create their own return message.
  http://expressjs.com/guide.html#error-handling
*/
app.use(function(err, req, res, next) {

  errorCount++;
  var id = (+ new Date()) + '-' +  errorCount;

  console.log("----------");
  console.log("error(" + id + ')');

  if (err.getDeveloperMessage) {
    console.log(err.getDeveloperMessage());
  } else {
    console.log("message: ", err);
  }

  console.log(err.stack);
  console.log("----------");

  // TODO if path.startsWith '/api/' res.render(error.html { message: ...})

  res.json(err.status || 500, {
    msg: err.clientMessage || 'An error has occurred',
    id: id
  });

});


app.listen(3000);
console.log('ready', new Date());
