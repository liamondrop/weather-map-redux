import React from 'react';
import {icons} from '../constants';

export default function Icon(props) {
  return (
    <i className="fa"
      dangerouslySetInnerHTML={{
        __html: icons[props.icon]
      }}
    />
  );
}