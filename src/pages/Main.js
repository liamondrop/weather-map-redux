import React from 'react';
import {bindAll, debounce, isEmpty} from 'underscore';
import {connect} from 'react-redux';
import {createHistory, useQueries} from 'history';
import Autocomplete from '../components/Autocomplete';
import initGoogleMaps from '../actions/init-google-maps';
import * as autocompletePredictions from '../actions/update-autocomplete-predictions';

const history = useQueries(createHistory)();

class Main extends React.Component {
  constructor() {
    super();
    bindAll(this, '_onHistoryChange', '_onSearch',
      '_onPredictionsReturn', '_onPredictionSelect');
    this.state = {unlisten: null};
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

  componentDidMount() {
    this.props.dispatch(initGoogleMaps());
  }

  _onHistoryChange(location) {
    const {dispatch, geocoder, map, mapsApi} = this.props;
    const placeId = location.query.place;
    if (placeId) {
      geocoder.geocode({placeId}, function(results, status) {
        if (status === mapsApi.GeocoderStatus.OK) {
          if (results[0]) {
            map.setZoom(10);
            map.setCenter(results[0].geometry.location);
          }
        }
      });
    }
  }

  _onSearch(e) {
    const {autocomplete, dispatch, mapsApi} = this.props;
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
          onPredictionSelect={this._onPredictionSelect}/>
      </div>
    );
  }
}

export default connect((state) => state)(Main);
