/* eslint no-console: 0, no-use-before-define: 0, no-unused-vars: 0 */

var _package = require('../package');

var fs = require('fs');
var path = require('path');
var compression = require('compression');
var logger = require('morgan');
var reactViews = require('./express-react-views');
var express = require('express');

// for cache control
var oneYear = 31557600000;

module.exports = function expressConfig() {
  var app = express();
  var webpackConfig;
  var compiler;

  var info = `
*
* Name: ${_package.description}
* Version: ${_package.version}
* Environment: ${app.get('env')}
* Port: %s
*
`;

  // hot loading development server
  if (app.get('env') === 'development') {
    webpackConfig = require('../webpack.config.dev');
    compiler = require('webpack')(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler));

    app.use(logger('dev'));
  }

  if (app.get('env') === 'production') {
    app.use(compression());
    app.use(logger('combined'));
  }

  app.use(express.static(path.resolve(__dirname, '../public'), {maxAge: oneYear}));

  app.set('info', info);
  app.set('views', path.resolve(__dirname, '../views'));
  app.set('view engine', 'js');
  app.engine('js', reactViews.createEngine());

  app.use(function appMiddlewareHandler(req, res, next) {
    res.setHeader('X-Powered-By', 'Weather App');
    res.locals.version = _package.version;
    next();
  });

  return app;
};
