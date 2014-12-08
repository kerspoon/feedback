(function (exports) {
  'use strict';
  /* jshint browser:true */
  /* global xhrFile:false, async:false, Ractive:false */

  var templates = {};
  exports.templates = templates;

  /**
   * Download a template and add it to the store.
   * @param {string} name - name of the template file
   * @param {function} callback - function to call when done.
   */
  function fetchTemplate(name, callback) {
    xhrFile(name, function (err, template) {
      if (!err) {
        templates[name] = template;
      }
      return callback(err);
    });
  }


  templates.init = function (names, callback) {
    async.mapSeries(names, fetchTemplate, callback);
  };


  templates.moveToPage = function (templateName, data) {
    return new Ractive({
      el: '.content',
      template: templates[templateName],
      data: data
    });
  };


  templates.setTopNav = function (title, hasBackButton) {
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