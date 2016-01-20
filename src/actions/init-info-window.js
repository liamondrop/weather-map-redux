import degreesToDirection from '../lib/map-degrees-to-direction';


function infoTemplate(feature) {
  return `
    <div class="info-window">
      <h5 class="location">${feature.getProperty('city')}</h5>
      <div class="row">
        <div class="col-xs-6">
          <div class="temp temp-current text-info">
            ${feature.getProperty('temperature')} &deg;
            <small class="temp-metric">F</small>
          </div>
        </div>
        <div class="col-xs-6">
          <div class="current-weather">
            <img src="${feature.getProperty('icon')}" alt="${feature.getProperty('weather')}"/>
            <span class="weather-caption">${feature.getProperty('weather')}</span>
          </div>
        </div>
      </div>
      <div class="hilo-wrapper">
        <div class="temp temp-hi">
          High:
          ${feature.getProperty('high')} &deg;
          <small class="temp-metric">F</small>
        </div>
        <div class="temp temp-lo">
          Low:
          ${feature.getProperty('low')} &deg;
          <small class="temp-metric">F</small>
        </div>
      </div>
      <div class="wind">
        Wind: ${degreesToDirection(feature.getProperty('windDegrees'))}
        ${feature.getProperty('windSpeed')} meters/sec
      </div>
      <div class="pressure">Pressure: ${feature.getProperty('pressure')} hPa</div>
      <div class="humidity">Hudity: ${feature.getProperty('humidity')}%</div>
    </div>
  `;
}


// Sets up and populates the info window with details
export default function initInfoWindow() {
  return (dispatch, getState) => {
    const {map, mapsApi} = getState();
    const infoWindow = new mapsApi.InfoWindow({
      pixelOffset: {width: 0, height: -12}
    });
    map.data.addListener('click', (event) => {
      const {feature, latLng} = event;
      infoWindow.setContent(infoTemplate(feature));
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
