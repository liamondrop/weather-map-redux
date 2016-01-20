import * as actions from '../constants/action-types';

export default function setFormattedPlaceName(name) {
  return (dispatch) => {
    dispatch({
      type: actions.SET_FORMATTED_PLACE_NAME,
      name
    });
  };
}
