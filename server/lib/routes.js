'use strict';
/* jshint node:true */

var roomController = require('./controller/room');

exports.init = function(app) {

  /*
    just return true on the root route so we can easily test if it is alive.
  */
  app.get('/api/v1', function(req, res, next) {
    res.json(true);
  });


  /*
    most of the routes call this to return json if there is no error or pass the
    error into the handler if there is one.
  */
  function makeGenericCallback(res, next) {
    return function(err, result) {
      if (err) {
        return next(err);
      } else {
        res.json(result || null);
      }
    };
  }


  app.route('/api/v1/room')
    // get all
    .get(function(req, res, next) {
      roomController.getAll(makeGenericCallback(res, next));
    })
    // create
    .post(function(req, res, next) {
      roomController.create(req.body, makeGenericCallback(res, next));
    });


  app.route('/api/v1/room/:id')
    // get all
    .get(function(req, res, next) {
      roomController.get(req.params.id, makeGenericCallback(res, next));
    })
    // update
    .post(function(req, res, next) {
      req.body.id = req.params.id;
      roomController.message(req.body, makeGenericCallback(res, next));
    })
    // delete
    .delete(function(req, res, next) {
      roomController.delete(res.locals.id, makeGenericCallback(res, next));
    });

};
