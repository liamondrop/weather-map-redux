import React from 'react';

export default function Autocomplete(props) {
  return (
    <div className="form-group autocomplete">
      <input id="autocomplete"
        type="text"
        className="form-control"
        onKeyUp={props.onSearch}/>
    </div>
  );
}
