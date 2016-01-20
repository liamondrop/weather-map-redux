import React from 'react';
import {bindAll, debounce} from 'underscore';
import {connect} from 'react-redux';
import {createHistory, useQueries} from 'history';
import Autocomplete from '../components/Autocomplete';
import initGoogleMaps from '../actions/init-google-maps';
import setFormattedPlaceName from '../actions/set-formatted-place-name';
import * as autocompletePredictions from '../actions/update-autocomplete-predictions';

const history = useQueries(createHistory)();

class Main extends React.Component {
  constructor() {
    super();
    bindAll(this, '_onHistoryChange', '_onSearch',
      '_onPredictionsReturn', '_onPredictionSelect');
    this.state = {unlisten: null};
  }

  componentDidMount() {
    this.props.dispatch(initGoogleMaps());
  }

  componentWillReceiveProps() {
    // defer listening to browser history until geocoder
    // has initiated in order to set the map location if
    // `location.query.place` is set
    if (this.state.unlisten === null &&
      typeof this.props.geocoder.geocode === 'function') {
      this.setState({
        unlisten: history.listen(this._onHistoryChange)
      });
    }
  }

  componentWillUnmount() {
    this.state.unlisten();
  }

  _onHistoryChange(location) {
    const {geocoder, map, mapsApi, dispatch} = this.props;
    const placeId = location.query.place;
    if (placeId) {
      geocoder.geocode({placeId}, (results, status) => {
        if (status === mapsApi.GeocoderStatus.OK) {
          const place = results[0];
          if (place) {
            map.setZoom(10);
            map.setCenter(place.geometry.location);
          }
          dispatch(setFormattedPlaceName(place.formatted_address));
        }
      });
    }
  }

  _onSearch(e) {
    const {autocomplete, dispatch} = this.props;
    const {value} = e.target;
    if (value) {
      autocomplete.getQueryPredictions({input: value},
        this._onPredictionsReturn);
    } else {
      dispatch(autocompletePredictions.clear());
    }
  }

  _onPredictionsReturn(predictions, status) {
    const {dispatch} = this.props;
    dispatch(autocompletePredictions.update(predictions, status));
  }

  _onPredictionSelect(event) {
    event.preventDefault();
    const {dispatch} = this.props;
    const matches = event.target.href.match(/.*(\/\?.*)/); // only get the pathname
    history.push(matches[1]);
    dispatch(autocompletePredictions.clear()); // clear predictions on select
  }

  render() {
    return (
      <div className="base" onClick={this._onClick}>
        <div ref="map" id="map-canvas" style={{height: '100%'}}/>
        <Autocomplete {...this.props}
          onSearch={debounce(this._onSearch, 200)}
          onPredictionSelect={this._onPredictionSelect}
        />
      </div>
    );
  }
}

export default connect((state) => state)(Main);
