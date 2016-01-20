import * as actions from '../constants/action-types';

export function predictions(state=[], action) {
  switch (action.type) {
    case actions.UPDATE_AUTOCOMPLETE_PREDICTIONS:
      return action.predictions;
    case actions.CLEAR_AUTOCOMPLETE_PREDICTIONS:
      return [];
    default:
      return state;
  }
}

export function autocomplete(state={}, action) {
  switch (action.type) {
    case actions.INITIATE_AUTOCOMPLETE_SERVICE:
      return action.autocomplete;
    default:
      return state;
  }
}

export function placeName(state=null, action) {
  switch (action.type) {
    case actions.SET_FORMATTED_PLACE_NAME:
      return action.name;
    case actions.UNSET_FORMATTED_PLACE_NAME:
      return null;
    default:
      return state;
  }
}
