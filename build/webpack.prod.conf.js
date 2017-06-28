const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

var config =  {
  entry: path.resolve(__dirname, './../project/src/index.js'),
  output: {
    path: path.resolve(__dirname, './../static/'),
    publicPath: '//localhost:3001/static',
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './../project/src/index.jade'),
      filename: 'index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader','stylus-loader']
      },
      {
        test: /\.jade$/,
        use: 'jade-loader'
      },
      {
        test: /\.stylus$/,
        loader: 'stylus-loader'
      },
      {
        test: /\.vue$/,
        loader: ['vue-loader']
      }
    ]
  }
}

module.exports = config
