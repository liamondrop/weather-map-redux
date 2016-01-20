import {map} from 'underscore';
import React from 'react';

export default class Autocomplete extends React.Component {
  render() {
    const {predictions, placeName} = this.props;
    return (
      <div className={`dropdown autocomplete${predictions.length ? ' open' : ''}`}>
        <div className="input-group">
          <input id="autocomplete"
            type="text"
            className="form-control"
            onKeyUp={this.props.onSearch}
          />
          <span className="input-group-btn">
            <a className="btn btn-default">&times;</a>
          </span>
        </div>
        <ul onClick={this.props.onPredictionSelect} className="dropdown-menu">
          {map(predictions, (p, index) => {
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
