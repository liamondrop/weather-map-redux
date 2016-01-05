import {isEmpty} from 'underscore';
import {actions} from '../constants';

function setMapBounds(northLat, eastLng, southLat, westLng) {
  return {
    type: actions.MAP_BOUNDS_UPDATE,
    mapBounds: {
      northLat, eastLng, southLat, westLng
    }
  };
}

export default function updateMapBounds() {
  return (dispatch, getState) => {
    const {map} = getState();
    if (!isEmpty(map) && typeof map.getBounds === 'function') {
      const bounds = map.getBounds();
      const NE = bounds.getNorthEast();
      const SW = bounds.getSouthWest();
      dispatch(setMapBounds(NE.lat(), NE.lng(), SW.lat(), SW.lng()));
    }
  };
}
