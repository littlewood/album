import axios from 'axios'

const urls = {
  list: '/album/getList',
  add: '/album/addFile',
  uploadImg: '/album/uploadImg',
  del: '/album/delFile',
  delImg: '/album/delImg'
}

function getList() {
  var url = urls.list
  return axios.get(url)
}

function addFile (param) {
  var url = urls.add
  return axios.post(url, param)
}

function uploadImg (param) {
  var url = urls.uploadImg
  return axios.post(url, param)
}

function delImg (param) {
  var url = urls.delImg
  console.log(param)
  return axios.post(url, param)
}
export {
  getList,
  addFile,
  uploadImg,
  delImg
}
