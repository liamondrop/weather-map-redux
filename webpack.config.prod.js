var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'hidden-source-map',
  entry: './src',
  output: {
    path: path.resolve(__dirname, './public/assets'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({comments: false})
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.resolve(__dirname, './src')
    }]
  }
};
