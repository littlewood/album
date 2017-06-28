var webpackConfig =  require('./webpack.prod.conf.js') 
var webpack = require('webpack')
var opn = require('opn')
var compiler = webpack(webpackConfig)

compiler.run(function(err, stats) {
  if (err) {
    console.error(err)
    return
  }
  console.log(stats.toString({
    colors: true
  }))

  console.log('----build is complete----')
  opn(`http://localhost:3001`)

  process.exit()
})
