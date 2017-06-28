const fs = require('fs')
const path = require('path')
const multer = require('multer')
const querystring = require('querystring')
const bodyParse = require('body-parser')

var upload = multer({ dest: './../static/uploads/'})

checkPath(path.join(__dirname, './../static/uploads/'))

module.exports = function(app) {
  app.use(bodyParse.json())

  // 读取文件列表
  app.get('/getList', function (req, res) {
    getUploadList(function(list) {
      let result = {
        code: 200,
        data: list,
        msg: 'ok'
      }
      res.json(result)
    })
  })

  // 删除图片
  app.post('/delImg', function(req, res) {
    let file = req.body.pic.replace(/\/\/localhost:3001/, '')
    file && fs.unlink(path.resolve(__dirname, './..' + file), function(error, data) {
      res.json('ok')
    })

  })

  // 上传图片
  app.post('/uploadImg', upload.single('file'), function(req, res) {
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
}


/**
 * 读取相册目录下的所有文件，完成之后执行回调函数
 * @param cb {Function} 回调函数
 */
function getUploadList (cb) {
  fs.readdir(path.resolve(__dirname, './../static/uploads'), function(error, list) {
    list = list || []
    let newList = list.map((v, i) => {
      return `//localhost:3001/static/uploads/${v}`
    })
    cb(newList)
  })
}

/**
 * 判断目录是否存在， 如果不存在则新建目录
 * @param fullPath {String} 目录路径
 * @param cb {Function} 创建目录后的回调函数
 */
function checkPath (fullPath, cb) {
  try {
    fs.statSync(fullPath)
  } catch(e) {
    fs.mkdir(fullPath, () => {
      cb && cb()
    })
  }
}
