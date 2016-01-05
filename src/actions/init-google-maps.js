import {isEmpty} from 'underscore';
import GoogleMapsLoader from 'google-maps';
import updateMapBounds from './update-map-bounds';
import {actions, MAP_OPTIONS} from '../constants';

function addEventListener(mapsApi, map) {
  return (dispatch) => {
    mapsApi.event.addListener(map, 'idle', () => {
      dispatch(updateMapBounds());
    });
    dispatch({type: actions.BIND_MAP_EVENTS});
  };
}

function bindToDomNode(mapsApi) {
  return (dispatch, getState) => {
    const {listening} = getState();
    if (!listening) {
      const map = new mapsApi.Map(
        document.getElementById(MAP_OPTIONS.elementId), MAP_OPTIONS);
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
