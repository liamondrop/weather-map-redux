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
