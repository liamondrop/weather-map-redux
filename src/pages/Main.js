import React from 'react';
import local from 'local-links';
import {bindAll, debounce} from 'underscore';
import {connect} from 'react-redux';
import GoogleMap from '../components/Map';
import Autocomplete from '../components/Autocomplete';
import initGoogleMaps from '../actions/init-google-maps';
import updateAutocompletePredictions from '../actions/update-autocomplete-predictions';

class Main extends React.Component {
  constructor() {
    super();
    bindAll(this, '_onClick', '_onSearch');
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(initGoogleMaps());
  }

  // delegate click handling of local
  // links to the client side router
  _onClick(e) {
    const pathName = local.pathname(e);
    if (pathName) {
      e.preventDefault();
      console.log(pathName);
      // app.router.navigate(pathName);
    }
  }

  _onSearch(e) {
    const {autocomplete, dispatch, mapsApi} = this.props;
    autocomplete.getQueryPredictions({input: e.target.value},
      updateAutocompletePredictions(mapsApi, dispatch));
  }

  render() {
    return (
      <div className="base" onClick={this._onClick}>
        <GoogleMap {...this.props}/>
        <Autocomplete {...this.props}
          onSearch={debounce(this._onSearch, 100)}/>
      </div>
    );
  }
}

export default connect((state) => state)(Main);
