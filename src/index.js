import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Main from './pages/Main';
import configureStore from './configureStore';

console.log(configureStore())

ReactDOM.render(
  <Provider store={configureStore()}>
    <Main/>
  </Provider>,
  document.getElementById('root')
);


// import {extend} from 'underscore';
// import app from 'ampersand-app';
// import Router from './router';
// import GoogleMapsLoader from 'google-maps';

// app.extend({
//   init() {
//     this.state = {};
//     this.router = new Router();
//     this.router.history.start({
//       hashChange: false
//     });
//     return this.state;
//   }
// });

// // load Google maps api. Triggers callback when api is loaded
// GoogleMapsLoader.LIBRARIES = ['places', 'geometry'];
// GoogleMapsLoader.load(function (google) {
//   app.state.google = google;
//   app.router.render(app.state);
// });

// window.app = app.init();
