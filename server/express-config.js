/* eslint no-console: 0, no-use-before-define: 0, no-unused-vars: 0 */

var path = require('path');
var compression = require('compression');
var logger = require('morgan');
var express = require('express');
var reactViews = require('./express-react-views');

// for cache control
var ONE_YEAR = 31557600000;

module.exports = function expressConfig() {
  var app = express();
  var webpackConfig;
  var compiler;

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

  app.use(express.static(
    path.resolve(__dirname, '../public'), {maxAge: ONE_YEAR}));

  app.set('views', path.resolve(__dirname, '../views'));
  app.set('view engine', 'js');
  app.engine('js', reactViews.createEngine());
  return app;
};
