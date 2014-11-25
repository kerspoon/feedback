'use strict';
/* jshint node:true */


var express = require('express');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var routes = require('./lib/routes');

var errorCount = 0;
var app = express();

app.use(helmet());


app.use('/', express.static(__dirname + '/../client'));
app.use('/bower_components', express.static(__dirname + '/../bower_components'));


/*
  We accept json hence we should parse it for all routes.
*/
app.use(bodyParser.json());

/*
  define all the routes we want to use.
*/
routes.init(app);


/*
  as this is the last normal route in the list it gets called if there are no
  other routes defined. Hence we can use this as the 404 handler.
*/
app.use(function(req, res, next){
  console.log("----------");
  console.log("route not found");
  console.log(req.method, req.path);
  console.log("----------");
  res.json(404, {msg: 'route not found'});
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

  res.json(err.status || 500, {
    msg: err.clientMessage || 'An error has occurred',
    id: id
  });

});


app.listen(3000);
console.log('ready', new Date());
