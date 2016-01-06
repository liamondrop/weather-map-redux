import {map} from 'underscore';
import * as actions from '../constants/action-types';
import * as mapOpts from '../constants/map-options';

const xhr = new XMLHttpRequest();

function handleResponse(dispatch, getState) {
  return function onXHRLoad() {
    try {
      const data = JSON.parse(xhr.responseText || '{}');
      const features = map(data.list, (item) => ({
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
          icon: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
          coordinates: [item.coord.lon, item.coord.lat]
        },
        geometry: {
          type: 'Point',
          coordinates: [item.coord.lon, item.coord.lat]
        }
      }));
      dispatch({
        type: actions.WEATHER_DATA_RECEIVED,
        geoJSON: {
          type: 'FeatureCollection',
          features
        }
      });
    } catch (error) {
      console.error(error.stack);
    }
  }
  // if (results.list.length > 0) {
  //   resetData();
  //   for (var i = 0; i < results.list.length; i++) {
  //     geoJSON.features.push(jsonToGeoJson(results.list[i]));
  //   }
  //   drawIcons(geoJSON);
  // }
}

function drawIcons(weather) {
  map.data.addGeoJson(geoJSON);
  gettingData = false;
}

// Clear data layer and geoJSON
function resetData() {
  geoJSON = {
    type: 'FeatureCollection',
    features: []
  };
  map.data.forEach(function (feature) {
    map.data.remove(feature);
  });
}



// function requestWeatherData() {
//   return {
//     type: actions.REQUEST_WEATHER_DATA
//   };
// }

// function weatherDataReceived() {
//   return {
//     type: actions.WEATHER_DATA_RECEIVED
//   };
// }

// For each result that comes back, convert the data to geoJSON
function toGeoJson(weatherItem) {
  return ;

  // Set the custom marker icon
  // map.data.setStyle(function (feature) {
  //   return {
  //     icon: {
  //       url: feature.getProperty('icon'),
  //       anchor: new google.maps.Point(25, 25)
  //     }
  //   };
  // });

  // returns object
  return feature;
};

// Make the weather request
function getWeather() {
  return (dispatch, getState) => {
    const {map, mapBounds} = getState();
    const {westLng, northLat, eastLng, southLat} = mapBounds;
    const requestUrl = `${mapOpts.OWM_API_BASE}/box/city?&cluster=yes&format=json`
                      + `&APPID=${window.OWM_APP_ID}&bbox=`
                      + `${westLng},${northLat},` // left top
                      + `${eastLng},${southLat},` // right bottom
                      + map.getZoom();
    xhr.onload = handleResponse(dispatch, getState);
    xhr.open('get', requestUrl, true);
    xhr.send();
    dispatch({type: actions.REQUEST_WEATHER_DATA});
  };
}

export default function requestWeatherData() {
  return (dispatch, getState) => {
    const {requestingData} = getState();
    if (requestingData) {
      xhr.abort();
      dispatch({type: actions.ABORT_WEATHER_DATA_REQUEST});
    }
    dispatch(getWeather());
  };
}
