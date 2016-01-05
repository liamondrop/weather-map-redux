import {isEmpty} from 'underscore';
import {MAP_OPTIONS} from '../constants';

function updateGoogle(google={}, state) {
  if (state.google !== google) {
    state.google = google;
  }
  return state;
}

function updateMap(state) {
  if (!isEmpty(state.google) && !state.map) {
    state.map = new state.google.maps.Map(
      document.getElementById(MAP_OPTIONS.elementId), MAP_OPTIONS);
  }
  return state;
}

export default function deriveCurrentState(state={}, props={}) {
  state = updateGoogle(props.google, state);
  state = updateMap(state);
  return state;
}
