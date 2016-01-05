var React = require('react');
var ReactDOMServer = require('react-dom/server');
var _ = require('underscore');

var DEFAULT_OPTIONS = {
  doctype: '<!DOCTYPE html>'
};

function createEngine(opts) {
  var engineOptions = _.extend({}, DEFAULT_OPTIONS, opts || {});
  var moduleDetectRegEx;
  var markup;
  var component;

  return function renderFile(filename, options, cb) {
    if (!moduleDetectRegEx) {
      moduleDetectRegEx = new RegExp('^' + options.settings.views);
    }

    try {
      markup = engineOptions.doctype;
      component = require(filename);
      
      // Transpiled ES6 may export components as { default: Component }
      component = component.default || component;
      markup += ReactDOMServer.renderToStaticMarkup(
        React.createElement(component, options)
      );
    } catch (error) {
      return cb(error);
    }

    if (options.settings.env === 'development') {
      // Remove all files from the module cache that are in the view folder.
      Object.keys(require.cache).forEach(function deleteModule(module) {
        if (moduleDetectRegEx.test(require.cache[module].filename)) {
          delete require.cache[module];
        }
      });
    }

    cb(null, markup);
  };
}

exports.createEngine = createEngine;
