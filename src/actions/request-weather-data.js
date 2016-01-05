
import {actions} from '../constants';

var xhr = new XMLHttpRequest();
// xhr.onload = proccessResults;

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

// function fetchPosts(reddit) {
//   return dispatch => {
//     dispatch(requestPosts(reddit))
//     return fetch(`http://www.reddit.com/r/${reddit}.json`)
//       .then(response => response.json())
//       .then(json => dispatch(receivePosts(reddit, json)))
//   }
// }

// Make the weather request
function getWeather() {
  return (dispatch, getState) => {
    const {mapBounds} = getState();
  };
  // this.setState({gettingData: true})
  // var requestString = 'http://api.openweathermap.org/data/2.5/box/city?bbox='
  //                     + westLng + ',' + northLat + ',' //left top
  //                     + eastLng + ',' + southLat + ',' //right bottom
  //                     + map.getZoom()
  //                     + '&cluster=yes&format=json'
  //                     + '&APPID=' + '551b97ca557560dfc7d8c49a81b37d89';
  // xhr.open('get', requestString, true);
  // xhr.send();
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
