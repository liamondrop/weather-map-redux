import GoogleMapsLoader from 'google-maps';
import {isEmpty} from 'underscore';
import {actions} from '../constants';

function mapsLoaded(google) {
  return {
    type: actions.LOAD_GOOGLE_MAPS,
    google
  };
}

// load Google maps api. Triggers callback when api is loaded
function loadMaps() {
  return dispatch => {
    GoogleMapsLoader.LIBRARIES = ['places', 'geometry'];
    GoogleMapsLoader.load(function (google) {
      dispatch(mapsLoaded(google));
    });
  };
}

function shouldLoad(state) {
  return isEmpty(state.google);
}

// initiate Google Maps api if it hasn't yet loaded
export default function initGoogleMaps() {
  return (dispatch, getState) => {
    if (shouldLoad(getState())) {
      return dispatch(loadMaps());
    }
  };
}
