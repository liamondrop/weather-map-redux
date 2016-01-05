import {extend} from 'underscore';
import {combineReducers} from 'redux';
import * as mapsInitialization from './maps-initialization';
import * as weatherData from './weather-data';

export default combineReducers(extend({},
  mapsInitialization,
  weatherData
));
