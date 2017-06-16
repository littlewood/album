import axios from 'axios'

const urls = {
  list: '/getList',
  add: '/addFile',
  uploadImg: '/uploadImg',
  del: '/delFile',
  delImg: '/delImg'
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
