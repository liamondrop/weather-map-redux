import {extend} from 'underscore';
import {combineReducers} from 'redux';
import * as mapsInitialization from './maps-initialization';
import * as weatherData from './weather-data';
import * as autocomplete from './autocomplete';

export default combineReducers(extend({},
  mapsInitialization,
  weatherData,
  autocomplete
));
