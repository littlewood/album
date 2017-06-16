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

app.use(bodyParse.json())
app.use(bodyParse.json())
// app.use(express.static(path.resolve(__dirname, './../project/dist')))

// app.get('/', function(req, res, next) {
//   console.log(__dirname + './../static/index.html')
//   res.sendFile(path.resolve(__dirname + './../static/index.html'))
// })

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
// app.use(bodyParse.urlencode({extended: true}))
app.post('/addFile', function(req, res) {
console.log('----------------------')
  console.log(req.body)
  // console.log(req.params)
  // console.log(req.body.fileName)
  res.json('ok')
})

app.post('/delImg', function(req, res) {
  console.log(req.body)
  var file = req.body.pic
  console.log(path.resolve(__dirname, './../static/') + file)
  file && fs.unlink(path.resolve(__dirname, './../static/' + file), function(error, data) {
    console.log(data)
    res.json('ok')
  })

})

app.post('/uploadImg', upload.single('file'), function(req, res) {
  console.log('--------new img-----------')
  var item = req.file
  var targetPath = path.resolve(__dirname, './../static/uploads/' + new Date().getTime() + '.jpg')
  var is = fs.createReadStream(item.path)
  var os = fs.createWriteStream(targetPath)

  is.pipe(os)

  is.on('end', function() {
    console.log('xxx')
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
  console.log(host, port)
  console.log('example app listening at localhost://%s:%s', host, port)
  // c.exec(`start localhost:${port}`)
})

function getList (cb) {
  fs.readdir(path.resolve(__dirname, './../static/uploads'), function(error, list) {
    // let url = `uploads${list}` 
    var newList = list.map((v, i) => {
      return `uploads/${v}`
    })
    cb(newList)
  })
}