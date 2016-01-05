import React from 'react';

export default function Root(props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="stylesheet" href={`/assets/styles.css?${props.version}`}/>
        <title>Weather App{props.title ? ` - ${props.title}` : ''}</title>
      </head>
      <body>
        <div id="root"/>
        <script src={`/assets/bundle.js?${props.version}`} async/>
      </body>
    </html>
  );
}
