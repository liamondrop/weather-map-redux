import {actions} from '../constants';

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
    case actions.MAP_BOUNDS_UPDATE:
      return action.mapBounds;
    default:
      return state;
  }
}

export function listening(state=false, action) {
  switch (action.type) {
    case actions.BIND_MAP_EVENTS:
      return true;
    default:
      return state;
  }
}
