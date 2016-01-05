import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Main from './pages/Main';
import configureStore from './configureStore';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Main/>
  </Provider>,
  document.getElementById('root')
);
