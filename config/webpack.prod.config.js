var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './js/index',
  ],
  output: {
    path: path.join(__dirname, '../lib'),
    filename: 'draftjs-utils.js',
    libraryTarget: 'commonjs2',
  },
  externals: {
    immutable: 'immutable',
    'draft-js': 'draft-js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, '../js'),
    }],
  },
};
