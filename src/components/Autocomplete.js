import {map} from 'underscore';
import React from 'react';

export default class Autocomplete extends React.Component {
  render() {
    const {predictions} = this.props;
    return (
      <div className={`dropdown autocomplete${predictions.length ? ' open' : ''}`}>
        <div className="input-group input-group-lg">
          <input id="autocomplete"
            type="text"
            className="form-control"
            onKeyUp={this.props.onSearch}/>
          <span className="input-group-addon">@</span>
        </div>
        <ul onClick={this.props.onPredictionSelect} className="dropdown-menu">
          {predictions.map((p, index) => {
            return (
              <li key={index}>
                <a href={`/?place=${p.place_id}`}>{p.description}</a>
              </li>
              );
          })}
        </ul>
      </div>
    );
  }
}
