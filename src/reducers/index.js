import {combineReducers} from 'redux';
import {actions} from '../constants'

function selectedReddit(state='reactjs', action) {
  switch (action.type) {
    case SELECT_REDDIT:
      return action.reddit
    default:
      return state
  }
}

function google(state={}, action) {
  switch (action.type) {
    case actions.LOAD_GOOGLE_MAPS:
      return action.google
    default:
      return state
  }
}

const rootReducer = combineReducers({
  google
})

export default rootReducer
