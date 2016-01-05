import GoogleMapsLoader from 'google-maps';
import {isEmpty} from 'underscore';
import {actions, MAP_OPTIONS} from '../constants';


function mapCanvasComplete(map) {
  return {
    type: actions.INITIATE_MAP_CANVAS,
    map
  };
}

function addListener(mapsApi, map) {
  return (dispatch) => {
    mapsApi.event.addListener(map, 'idle', dispatch(bindMapEvents()));
  };
}

function bindToDomNode(mapsApi) {
  return (dispatch, getState) => {
    const {listening} = getState();
    if (!listening) {
      const map = new mapsApi.Map(document.getElementById(MAP_OPTIONS.elementId),
        MAP_OPTIONS);
      return dispatch(mapCanvasComplete(map));
    }
  };
}

function mapsLoaded(mapsApi) {
  return {
    type: actions.LOAD_GOOGLE_MAPS,
    mapsApi
  };
}

// load Google maps api. Triggers callback when api is loaded
function loadMaps() {
  return (dispatch) => {
    GoogleMapsLoader.LIBRARIES = ['places', 'geometry'];
    GoogleMapsLoader.load((google) => {
      const {maps} = google;
      dispatch(mapsLoaded(maps));
      dispatch(bindToDomNode(maps));
    });
  };
}

// initiate Google Maps api if it hasn't yet loaded
export default function initGoogleMaps() {
  return (dispatch, getState) => {
    const {maps} = getState();
    if (isEmpty(maps)) {
      return dispatch(loadMaps());
    }
  };
}
