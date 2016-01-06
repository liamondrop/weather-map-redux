import * as actions from '../constants/action-types';

export function geoJSON(state={features: []}, action) {
  switch (action.type) {
    case actions.WEATHER_DATA_RECEIVED:
      return action.geoJSON
    default:
      return state
  }
}

export function requestingData(state=false, action) {
  switch (action.type) {
    case actions.REQUEST_WEATHER_DATA:
      return true;
    case actions.WEATHER_DATA_RECEIVED:
    case actions.ABORT_WEATHER_DATA_REQUEST:
      return false;
    default:
      return state;
  }
}
