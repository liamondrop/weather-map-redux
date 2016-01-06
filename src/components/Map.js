import {bindAll} from 'underscore';
import React from 'react';

export default class Map extends React.Component {
  componentWillReceiveProps(nextProps) {
    // if (!this.state.listening && nextProps.google.maps) {
    //   nextProps.google.maps.event.addListener(
    //     nextProps.map, 'idle', this.checkIfDataRequested);
    //   this.setState({listening: true});
    // }
  }

  render() {
    return (
      <div ref="map" id="map-canvas" style={{height: '100%'}}/>
    );
  }
}


//   var infowindow = new google.maps.InfoWindow();







// // Sets up and populates the info window with details
// map.data.addListener('click', function(event) {
//   infowindow.setContent(
//    "<img src=" + event.feature.getProperty("icon") + ">"
//    + "<br /><strong>" + event.feature.getProperty("city") + "</strong>"
//    + "<br />" + event.feature.getProperty("temperature") + "&deg;C"
//    + "<br />" + event.feature.getProperty("weather")
//    );
//   infowindow.setOptions({
//       position:{
//         lat: event.latLng.lat(),
//         lng: event.latLng.lng()
//       },
//       pixelOffset: {
//         width: 0,
//         height: -15
//       }
//     });
//   infowindow.open(map);
// });