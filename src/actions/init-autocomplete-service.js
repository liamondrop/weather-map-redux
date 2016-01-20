import * as actions from '../constants/action-types';

export default function initAutocompleteService(mapsApi) {
  return (dispatch, getState) => {
    const autocomplete = new mapsApi.places.AutocompleteService();
    dispatch({
      type: actions.INITIATE_AUTOCOMPLETE_SERVICE,
      autocomplete
    });
  };
}
