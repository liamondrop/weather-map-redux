import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, createLogger())(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducers, initialState);
  return store;
}
