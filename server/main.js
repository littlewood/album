var fs = require('fs')
var path = require('path')
var express = require('express')
var multer = require('multer')
var c = require('child_process')
var reload = require('reload')
var http = require('http')
var app = express()
var querystring = require('querystring')
var bodyParse = require('body-parser')
var upload = multer({ dest: './../static/uploads/'})

checkPath(path.join(__dirname, './../static/uploads/'))

app.use(bodyParse.json())
app.use(bodyParse.json())
app.use('/static', express.static('static'))

app.get('/', function(req, res, next) {
  console.log(__dirname + './../static/index.html')
  res.sendFile(path.resolve(__dirname, './../static/index.html'))
})

app.get('/getList', function (req, res) {
  let data = {
    code: '200',
    data: {}
  }

  getList(function(list) {
    data.data = list

    res.json(list)
  })
})

app.post('/addFile', function(req, res) {
  res.json('ok')
})

app.post('/delImg', function(req, res) {
  let file = req.body.pic.replace(/\/\/localhost:3001/, '')
  file && fs.unlink(path.resolve(__dirname, './..' + file), function(error, data) {
    res.json('ok')
  })

})

app.post('/uploadImg', upload.single('file'), function(req, res) {
  console.log('-------- new img -----------')
  let  item = req.file
  let extName = item.originalname.match(/(\.[^\.]+)$/)[1]
  let targetPath = path.resolve(__dirname, './../static/uploads/' + new Date().getTime()) + extName
  let is = fs.createReadStream(item.path)
  let os = fs.createWriteStream(targetPath)

  is.pipe(os)

  is.on('end', function() {
    res.json({
      url: targetPath
    })
  })
})

var server = http.createServer(app)
reload(server, app)

server.listen(3001, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('example app listening at localhost://%s:%s', host, port)
})

function getList (cb) {
  fs.readdir(path.resolve(__dirname, './../static/uploads'), function(error, list) {
    list = list || []
    var newList = list.map((v, i) => {
      return `//localhost:3001/static/uploads/${v}`
    })
    cb(newList)
  })
}

function checkPath (fullPath, cb) {
  try {
    fs.statSync(fullPath)
  } catch(e) {
    fs.mkdir(fullPath, () => {
      cb && cb()
    })
  }
}