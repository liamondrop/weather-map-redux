import * as actions from '../constants/action-types';

export function geoJSON(state={features: []}, action) {
  switch (action.type) {
    case actions.RECEIVE_WEATHER_DATA:
      return action.geoJSON;
    case actions.CLEAR_DATA_LAYER:
      return {features: []};
    default:
      return state;
  }
}

export function requestingData(state=false, action) {
  switch (action.type) {
    case actions.REQUEST_WEATHER_DATA:
      return true;
    case actions.RECEIVE_WEATHER_DATA:
    case actions.ABORT_WEATHER_DATA_REQUEST:
      return false;
    default:
      return state;
  }
}
