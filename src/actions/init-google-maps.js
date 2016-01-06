import {isEmpty} from 'underscore';
import GoogleMapsLoader from 'google-maps';
import updateMapBounds from './update-map-bounds';
import requestWeatherData from './request-weather-data';
import * as actions from '../constants/action-types';
import * as mapOpts from '../constants/map-options';

function addEventListener(mapsApi, map) {
  return (dispatch) => {
    mapsApi.event.addListener(map, 'idle', () => {
      dispatch(updateMapBounds());
      dispatch(requestWeatherData());
    });
    dispatch({type: actions.BIND_MAP_EVENTS});
  };
}

function bindToDomNode(mapsApi) {
  return (dispatch, getState) => {
    const {listening} = getState();
    if (!listening) {
      const map = new mapsApi.Map(
        document.getElementById(mapOpts.ELEMENT), mapOpts.OPTIONS);
      dispatch(addEventListener(mapsApi, map));
      dispatch({
        type: actions.INITIATE_MAP_CANVAS,
        map
      });
    }
  };
}

function loadMaps() {
  return (dispatch) => {
    GoogleMapsLoader.LIBRARIES = ['places', 'geometry'];
    GoogleMapsLoader.load((google) => {
      const mapsApi = google.maps;
      dispatch(bindToDomNode(mapsApi));
      dispatch({
        type: actions.LOAD_GOOGLE_MAPS,
        mapsApi
      });
    });
  };
}

export default function initGoogleMaps() {
  return (dispatch, getState) => {
    const {maps} = getState();
    if (isEmpty(maps)) {
      return dispatch(loadMaps());
    }
  };
}
