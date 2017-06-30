const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true'

var devConfig =  {
  entry: ['./build/dev-client.js', './project/src/index.js'],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './../static/'),
    publicPath: '/',
    filename: 'bundle.[hash].js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'project/src/index.jade',
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include:[path.resolve(__dirname,"./../project")]
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

module.exports = devConfig
