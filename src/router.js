import {extend} from 'underscore';
import Router from 'ampersand-router';
import ReactDOM from 'react-dom';
import React from 'react';
import Main from './pages/Main';

export default Router.extend({
  routes: {
    ''                        : 'home',
    'error'                   : 'error',
    '*notFound'               : 'notFound'
  },

  initialize(state) {
    this.state = state;
  },

  render(state={}) {
    this.state = extend({}, this.state, state);
    ReactDOM.render(
      <Main {...this.state}/>,
      document.getElementById('root')
    );
  },

  /**
   * Public Routes
   */
  home() {
    this.render({
      page: 'Home',
      title: 'Welcome',
      layout: 'Home'
    });
  },

  error() {
    this.render({
      page: 'ServerError',
      title: 'Error'
    });
  },

  notFound() {
    this.render({
      page: 'NotFound',
      title: 'Page Not Found'
    });
  }
});
