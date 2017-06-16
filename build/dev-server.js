var fs = require('fs')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var webpackConfig = require('./webpack.config')
var config = require('./../config')
var opn = require('opn')
var proxyMiddleware = require('http-proxy-middleware')

var compiler = webpack(webpackConfig)
var app = express()
var proxyTable = config.dev.proxyTable

var devMiddleWare = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  hot: true,
  stats: {
    colors: true
  }
})

var hotMiddleWare = webpackHotMiddleware(compiler)

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleWare.publish({ action: 'reload' })
    cb()
  })
})

// set proxy
Object.keys(proxyTable).forEach(function(context) {
  var options = proxyTable[context]
  app.use(context, proxyMiddleware(options))
})

app.use(devMiddleWare)
app.use(hotMiddleWare)

app.use(express.static('static'))


var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

devMiddleWare.waitUntilValid(() => {
  let uri = `http://localhost:3000`
  opn(uri)
  _resolve()
})
// app.use(router)
app.listen(3000, function() {
  console.log('listening on 3000')
})

module.exports = {
  redy: readyPromise,
  close: () => {
    server.close()
  }
}