(function(exports) {
  'use strict';
  /* jshint browser:true */

  var templates = {};
  exports.templates = templates;


  function fetchTemplate(name, callback) {
    xhrFile(name, function(err, template) {
      if (!err) {
        templates[name] = template;
      }
      return callback(err);
    });
  }


  templates.init = function(names, callback) {
    async.mapSeries(names, fetchTemplate, callback);
  };


  templates.moveToPage = function(templateName, data) {
    return new Ractive({
      el: '.content',
      template: templates[templateName],
      data: data
    });
  };


  templates.setTopNav = function(title, hasBackButton) {
    return new Ractive({
      el: '.top-navigation',
      template: templates.nav,
      data: {
        title: title,
        hasBackButton: hasBackButton
      }
    });
  };

}(window));
