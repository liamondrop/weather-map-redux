import * as actions from '../constants/action-types';

export default function initAutocompleteService() {
  return (dispatch, getState) => {
    const {mapsApi} = getState();
    const autocomplete = new mapsApi.places.AutocompleteService();
    dispatch({
      type: actions.INITIATE_AUTOCOMPLETE_SERVICE,
      autocomplete
    });
  };
}
