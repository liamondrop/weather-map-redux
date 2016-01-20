import _ from 'underscore';
import * as actions from '../constants/action-types';
import * as mapOpts from '../constants/map-options';

const xhr = new XMLHttpRequest();

function _onXHRLoad(dispatch) {
  return function handleResponse() {
    dispatch(clearDataLayer());
    dispatch(formatResponse(xhr.responseText));
    dispatch(drawIcons());
  }
}

function clearDataLayer() {
  return (dispatch, getState) => {
    const {map} = getState();
    map.data.forEach(function (feature) {
      map.data.remove(feature);
    });
    dispatch({type: actions.CLEAR_DATA_LAYER});
  };
}

function formatResponse(responseText='{}') {
  return (dispatch, getState) => {
    const data = JSON.parse(responseText);
    if (_.isArray(data.list)) {
      dispatch({
        type: actions.RECEIVE_WEATHER_DATA,
        geoJSON: {
          type: 'FeatureCollection',
          features: _.map(data.list, (item) => ({
            type: 'Feature',
            properties: {
              city: item.name,
              weather: item.weather[0].main,
              temperature: item.main.temp,
              min: item.main.temp_min,
              max: item.main.temp_max,
              humidity: item.main.humidity,
              pressure: item.main.pressure,
              windSpeed: item.wind.speed,
              windDegrees: item.wind.deg,
              windGust: item.wind.gust,
              icon: `${mapOpts.OWM_ICON_BASE}/${item.weather[0].icon}.png`,
              coordinates: [item.coord.lon, item.coord.lat]
            },
            geometry: {
              type: 'Point',
              coordinates: [item.coord.lon, item.coord.lat]
            }
          }))
        }
      });
    }
  };
}

function drawIcons(weather) {
  return (dispatch, getState) => {
    const {map, geoJSON} = getState();
    map.data.addGeoJson(geoJSON);
    map.data.setStyle((feature) => ({
      icon: {
        url: feature.getProperty('icon'),
        anchor: new google.maps.Point(25, 25)
      }
    }));
  };
}

// Make the weather request
function getWeatherData() {
  return (dispatch, getState) => {
    const {map, mapBounds} = getState();
    if (typeof map.getZoom === 'function') {
      const {westLng, northLat, eastLng, southLat} = mapBounds;
      const requestUrl = `${mapOpts.OWM_API_BASE}/box/city?cluster=yes&format=json`
                        + `&units=imperial&APPID=${window.OWM_APP_ID}&bbox=`
                        + `${westLng},${northLat},` // left top
                        + `${eastLng},${southLat},` // right bottom
                        + map.getZoom();              
      xhr.onload = _onXHRLoad(dispatch);
      xhr.open('get', requestUrl, true);
      xhr.send();
      dispatch({type: actions.REQUEST_WEATHER_DATA});
    }
  };
}

export default function requestWeatherData() {
  return (dispatch, getState) => {
    const {requestingData} = getState();
    if (requestingData) {
      xhr.abort();
      dispatch({type: actions.ABORT_WEATHER_DATA_REQUEST});
    }
    dispatch(getWeatherData());
  };
}
