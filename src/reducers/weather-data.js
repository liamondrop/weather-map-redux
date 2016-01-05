import {actions} from '../constants';

// export function map(state={}, action) {
//   switch (action.type) {
//     case actions.INITIATE_MAP_CANVAS:
//       return action.map
//     default:
//       return state
//   }
// }

// export function mapsApi(state={}, action) {
//   switch (action.type) {
//     case actions.LOAD_GOOGLE_MAPS:
//       return action.mapsApi
//     default:
//       return state
//   }
// }

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
