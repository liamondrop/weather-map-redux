import * as actions from '../constants/action-types';

export default function updateAutocompletePredictions(mapsApi, dispatch) {
  const ok = mapsApi.places.PlacesServiceStatus.OK;
  return (predictions, status) => {
    if (status != ok) {
      return;
    }
    dispatch({
      type: actions.UPDATE_AUTOCOMPLETE_PREDICTIONS,
      predictions
    });
  };
}
