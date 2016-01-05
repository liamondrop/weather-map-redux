/* eslint no-console: 0, no-unused-vars: 0 */

var app = configureExpress = require('./express-config')();
var port = process.env.PORT || '3000';
var server;

app.get('/*', function routeHandler(req, res, next) {
  res.render('Root', {
    title: 'Welcome'
  });
});

app.use(function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
});

app.use(function errorHandler(err, req, res, next) {
  res.sendStatus(500);
});

app.listen(port, function appListenerCallback() {
  console.info(app.get('info'), port);
});
