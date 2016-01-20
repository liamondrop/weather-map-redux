import * as actions from '../constants/action-types';

export function update(predictions, status) {
  return (dispatch, getState) => {
    const {mapsApi} = getState();
    if (status === mapsApi.places.PlacesServiceStatus.OK) {
      dispatch({
        type: actions.UPDATE_AUTOCOMPLETE_PREDICTIONS,
        predictions
      });
    }
  };
}

export function clear() {
  return (dispatch) => {
    dispatch({
      type: actions.CLEAR_AUTOCOMPLETE_PREDICTIONS
    });
  };
}