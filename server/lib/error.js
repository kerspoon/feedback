'use strict';
/* jshint node:true */


/*
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
  Create a custom error object that includes the HTML status code to return.
*/
function WebError(status, clientMessage, developerMessage) {
  this.name = 'WebError';
  this.status = status;
  this.message = developerMessage || clientMessage;
  this.clientMessage = clientMessage;
  this.stack = (new Error()).stack;
}

WebError.prototype.getDeveloperMessage = function() {
  return this.message;
};

WebError.prototype.prototype = Error;

module.exports.WebError = WebError;
