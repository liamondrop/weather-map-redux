// Sets up and populates the info window with details
export default function initInfoWindow() {
  return (dispatch, getState) => {
    const {map, mapsApi} = getState();
    const infoWindow = new mapsApi.InfoWindow({
      pixelOffset: {width: 0, height: -12}
    });
    map.data.addListener('click', (event) => {
      const {feature, latLng} = event;
      infoWindow.setContent(
       '<img src=' + feature.getProperty('icon') + '>'
       + '<br /><strong>' + feature.getProperty('city') + '</strong>'
       + '<br />' + feature.getProperty('temperature') + '&deg; F'
       + '<br />' + feature.getProperty('weather')
       );
      infoWindow.setOptions({
        position:{
          lat: latLng.lat(),
          lng: latLng.lng()
        }
      });
      infoWindow.open(map);
    });
  };
}
