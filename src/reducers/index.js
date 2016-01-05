import {combineReducers} from 'redux';
import {actions} from '../constants'

function map(state={}, action) {
  switch (action.type) {
    case actions.INITIATE_MAP_CANVAS:
      return action.map
    default:
      return state
  }
}

export default function mapsApi(state={}, action) {
  switch (action.type) {
    case actions.LOAD_GOOGLE_MAPS:
      return action.mapsApi
    default:
      return state
  }
}

function listening(state=false, action) {
  switch (action.type) {
    case actions.BIND_MAP_EVENTS:
      return action.listening
    default:
      return state
  }
}

const rootReducer = combineReducers({
  map,
  mapsApi,
  listening
});

export default rootReducer
