const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: __dirname + '/client',
  entry: './index.jsx',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'env']
        },
      },      
      {
        test: /\.css$/,
        include: SRC_DIR,
        use: ['style-loader', 'css-loader']
      }
    ],
    
  },
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
  }
};