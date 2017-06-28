const express = require('express')
const path = require('path')

module.exports = function(app) {
  app.use('/static', express.static('static'))

  app.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, './../static/index.html'))
  })
}