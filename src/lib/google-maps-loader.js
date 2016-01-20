const BASE_URL = 'https://maps.googleapis.com/maps/api/js';
const WINDOW_CALLBACK_NAME = '__google_maps_api_ready__';

let google = null;
let loading = false;
let callbacks = [];

const loader = {
  KEY: null,
  LIBRARIES: [],
  CLIENT: null,
  CHANNEL: null,
  LANGUAGE: null,

  load(fn) {
    if (google === null) {
      if (loading === true) {
        if (fn) {
          callbacks.push(fn);
        }
      } else {
        loading = true;
        window[WINDOW_CALLBACK_NAME] = function windowCallback() {
          loader.ready(fn);
        };
        loader.createLoader();
      }
    } else if (fn) {
      fn(google);
    }
  },

  ready(fn) {
    loading = false;
    if (google === null) google = window.google;
    if (fn) fn(google);
    while (callbacks.length > 0) {
      let cb = callbacks.shift();
      cb(google);
    }
  },

  createLoader() {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = loader.createUrl();
    document.body.appendChild(script);
  },

  createUrl() {
    let url = `${BASE_URL}?callback=${WINDOW_CALLBACK_NAME}`;
    if (loader.LIBRARIES.length > 0) {
      url += `&libraries=${loader.LIBRARIES.join(',')}`;
    }
    return url;
  }
};

export default loader;
