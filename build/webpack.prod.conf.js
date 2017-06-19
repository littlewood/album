const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true'
console.log()
var devConfig =  {
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
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './../project/src/index.jade'),
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
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
        test: /\.js$/,
        loader: 'babel-loader',
        include: '/project'
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

module.exports = devConfig
