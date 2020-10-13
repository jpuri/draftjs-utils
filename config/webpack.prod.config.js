var path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: ['./js/index'],
  output: {
    path: path.join(__dirname, '../lib'),
    filename: 'draftjs-utils.js',
    library: 'draftjsUtils',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  externals: {
    immutable: 'immutable',
    'draft-js': 'draft-js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{ loader: 'babel-loader' }],
        include: path.join(__dirname, '../js'),
      },
    ],
  },
};
