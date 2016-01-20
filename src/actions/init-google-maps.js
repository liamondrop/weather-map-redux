import {isEmpty} from 'underscore';
import googleMapsLoader from '../lib/google-maps-loader';
import updateMapBounds from './update-map-bounds';
import requestWeatherData from './request-weather-data';
import initAutocompleteService from './init-autocomplete-service';
import initInfoWindow from './init-info-window';
import * as actions from '../constants/action-types';
import * as mapOpts from '../constants/map-options';

function addMapEventListener() {
  return (dispatch, getState) => {
    const {map, mapsApi} = getState();
    mapsApi.event.addListener(map, 'idle', () => {
      dispatch({type: actions.ADD_MAPS_EVENT_LISTENER});
      dispatch(updateMapBounds());
      dispatch(requestWeatherData());
    });
  };
}

function bindToDomNode() {
  return (dispatch, getState) => {
    const {listening, mapsApi} = getState();
    if (!listening) {
      dispatch({
        type: actions.INITIATE_MAP_CANVAS,
        map: new mapsApi.Map(
          document.getElementById(mapOpts.MAP_ELEMENT),
          mapOpts.OPTIONS)
      });
    }
  };
}

function initGeocoder() {
  return (dispatch, getState) => {
    const {mapsApi} = getState();
    dispatch({
      type: actions.INITIATE_GEOCODER,
      geocoder: new mapsApi.Geocoder
    });
  };
}

function loadMaps() {
  return (dispatch) => {
    googleMapsLoader.LIBRARIES = ['places'];
    googleMapsLoader.load((google) => {
      if (!isEmpty(google) && google.maps) {
        const mapsApi = google.maps;
        dispatch({
          type: actions.LOAD_GOOGLE_MAPS,
          mapsApi
        });
        dispatch(bindToDomNode());
        dispatch(initGeocoder());
        dispatch(initAutocompleteService());
        dispatch(addMapEventListener());
        dispatch(initInfoWindow());
      }
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
