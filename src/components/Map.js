import {bindAll} from 'underscore';
import React from 'react';

export default class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      listening: false,
      gettingData: false
    };
    this.request = new XMLHttpRequest();
    bindAll(this, 'checkIfDataRequested');
  }

  componentDidMount() {
    console.log(this.refs.map)
  }

  componentWillReceiveProps(nextProps) {
    // if (!this.state.listening && nextProps.google.maps) {
    //   nextProps.google.maps.event.addListener(
    //     nextProps.map, 'idle', this.checkIfDataRequested);
    //   this.setState({listening: true});
    // }
  }

  checkIfDataRequested() {
    // Stop extra requests being sent
    if (this.state.gettingData) {
      // request.abort();
      this.setState({gettingData: false});
    }
    this.getCoords();
  }

  // get current view boundary coordinates
  getCoords() {
    var bounds = this.props.map.getBounds();
    var NE = bounds.getNorthEast();
    var SW = bounds.getSouthWest();
    getWeather(NE.lat(), NE.lng(), SW.lat(), SW.lng());
  }

  // Make the weather request
  getWeather(northLat, eastLng, southLat, westLng) {
    this.setState({gettingData: true})
    var requestString = "http://api.openweathermap.org/data/2.5/box/city?bbox="
                        + westLng + "," + northLat + "," //left top
                        + eastLng + "," + southLat + "," //right bottom
                        + map.getZoom()
                        + "&cluster=yes&format=json"
                        + "&APPID=" + "551b97ca557560dfc7d8c49a81b37d89";
    request = new XMLHttpRequest();
    request.onload = proccessResults;
    request.open("get", requestString, true);
    request.send();
  }

  render() {
    return (
      <div ref="map" id="map-canvas" style={{height: '100%'}}/>
    );
  }
}


//   var infowindow = new google.maps.InfoWindow();


//   // For each result that comes back, convert the data to geoJSON
//   var jsonToGeoJson = function (weatherItem) {
//     var feature = {
//       type: "Feature",
//       properties: {
//         city: weatherItem.name,
//         weather: weatherItem.weather[0].main,
//         temperature: weatherItem.main.temp,
//         min: weatherItem.main.temp_min,
//         max: weatherItem.main.temp_max,
//         humidity: weatherItem.main.humidity,
//         pressure: weatherItem.main.pressure,
//         windSpeed: weatherItem.wind.speed,
//         windDegrees: weatherItem.wind.deg,
//         windGust: weatherItem.wind.gust,
//         icon: "http://openweathermap.org/img/w/"
//               + weatherItem.weather[0].icon  + ".png",
//         coordinates: [weatherItem.coord.lon, weatherItem.coord.lat]
//       },
//       geometry: {
//         type: "Point",
//         coordinates: [weatherItem.coord.lon, weatherItem.coord.lat]
//       }
//     };
//     // Set the custom marker icon
//     map.data.setStyle(function(feature) {
//       return {
//         icon: {
//           url: feature.getProperty('icon'),
//           anchor: new google.maps.Point(25, 25)
//         }
//       };
//     });

//     // returns object
//     return feature;
//   };

//   // Add the markers to the map
//   var drawIcons = function (weather) {
//      map.data.addGeoJson(geoJSON);
//      // Set the flag to finished
//      gettingData = false;
//   };

//   // Clear data layer and geoJSON
//   var resetData = function () {
//     geoJSON = {
//       type: "FeatureCollection",
//       features: []
//     };
//     map.data.forEach(function(feature) {
//       map.data.remove(feature);
//     });
//   };

//   // Take the JSON results and proccess them
//   var proccessResults = function() {
//     console.log(this);
//     var results = JSON.parse(this.responseText);
//     if (results.list.length > 0) {
//         resetData();
//         for (var i = 0; i < results.list.length; i++) {
//           geoJSON.features.push(jsonToGeoJson(results.list[i]));
//         }
//         drawIcons(geoJSON);
//     }
//   };






//   // // Sets up and populates the info window with details
//   // map.data.addListener('click', function(event) {
//   //   infowindow.setContent(
//   //    "<img src=" + event.feature.getProperty("icon") + ">"
//   //    + "<br /><strong>" + event.feature.getProperty("city") + "</strong>"
//   //    + "<br />" + event.feature.getProperty("temperature") + "&deg;C"
//   //    + "<br />" + event.feature.getProperty("weather")
//   //    );
//   //   infowindow.setOptions({
//   //       position:{
//   //         lat: event.latLng.lat(),
//   //         lng: event.latLng.lng()
//   //       },
//   //       pixelOffset: {
//   //         width: 0,
//   //         height: -15
//   //       }
//   //     });
//   //   infowindow.open(map);
//   // });