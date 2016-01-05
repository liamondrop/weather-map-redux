/* eslint no-console: 0, no-unused-vars: 0 */

var _package = require('../package');
var app = require('./express-config')();
var port = process.env.PORT || '3000';
var server;

  var info = `
*
* Name: ${_package.description}
* Version: ${_package.version}
* Environment: ${app.get('env')}
* Port: %s
*
`;

app.use(function appMiddlewareHandler(req, res, next) {
  res.setHeader('X-Powered-By', 'Weather App Redux');
  res.locals.version = _package.version;
  next();
});

app.get('/*', function routeHandler(req, res, next) {
  res.render('Root');
});

app.use(function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
});

app.use(function errorHandler(err, req, res, next) {
  res.sendStatus(500);
});

app.listen(port, function appListenerCallback() {
  console.info(info, port);
});
