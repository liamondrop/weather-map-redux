import React from 'react';
import local from 'local-links';
import {bindAll} from 'underscore';
import {connect} from 'react-redux';
import {deriveCurrentState} from '../lib';
import GoogleMap from '../components/Map';
import {initGoogleMaps} from '../actions'

class Main extends React.Component {
  constructor() {
    super();
    bindAll(this, '_onClick');
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
      console.log(pathName)
      // app.router.navigate(pathName);
    }
  }

  render() {
    console.log('RENDER', this.props)
    return (
      <div className="base" onClick={this._onClick}>
        <GoogleMap {...this.state}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Main);
