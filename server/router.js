const express = require('express')

module.exports = function(app) {
  app.use('/static', express.static('static'))

  app.get('/', function(req, res, next) {
    console.log(__dirname + './../static/index.html')
    res.sendFile(path.resolve(__dirname, './../static/index.html'))
  })
}