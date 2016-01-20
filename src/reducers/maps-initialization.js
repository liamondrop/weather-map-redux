import * as actions from '../constants/action-types';

export function map(state={}, action) {
  switch (action.type) {
    case actions.INITIATE_MAP_CANVAS:
      return action.map;
    default:
      return state;
  }
}

export function mapsApi(state={}, action) {
  switch (action.type) {
    case actions.LOAD_GOOGLE_MAPS:
      return action.mapsApi;
    default:
      return state;
  }
}

export function mapBounds(state={}, action) {
  switch (action.type) {
    case actions.UPDATE_MAP_BOUNDS:
      return action.mapBounds;
    default:
      return state;
  }
}

export function geocoder(state={}, action) {
  switch (action.type) {
    case actions.INITIATE_GEOCODER:
      return action.geocoder;
    default:
      return state;
  }
}

export function listening(state=false, action) {
  switch (action.type) {
    case actions.ADD_MAPS_EVENT_LISTENER:
      return true;
    default:
      return state;
  }
}
