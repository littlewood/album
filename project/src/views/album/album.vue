<template lang="jade">
  div.section-album
    div.title
      p.tit 默认相册
        span.btn-new(@click="showUpload") 上传图片
    ul.album
      li.item(v-for="item in fileList", :key="item") 
        span.pic(:style="item | picStyle")
        i.del(@click="delImg(item)") del
    div(class="upload-img", v-show="isShowUpload")
      p 上传图片
      iframe(name="uploadFrame", id="uploadFrame", style="display:none;", ref="frame")
      form(action="/uploadImg", method="post", enctype="multipart/form-data", target="uploadFrame", ref="form")
        input(type="file", name="file", @change="changeImg", ref="files")
        input(type="button", value="提交", @click="sumbit")
        input(type="reset", value="取消", @click="reset")
      div.preview
        p 预览
        img(:src="preUrl")
</template>
<style lang="stylus">
  .section-album
    max-width: 1360px
    margin: 0 auto
  .title
    position: relative
    .btn-new
      position: absolute
      right: 0
  .album
    &:after
      content: ''
      display: block
      clear: both
    .item
      float: left
      position: relative
      margin: 0 5px
      border: 2px solid #ccc
      box-sizing: border-box
      width: 150px
      height: 200px
      overflow: hidden
      &:hover
        .pic
          transform: scale(1.3)
      &:hover
        .del
          display: block
      .del
        color: #fff
        display: none
        cursor: pointer
        font-style: normal
        width: 20px
        height: 20px
        text-align: center
        line-height: 20px
        font-size: 12px
        background: rgba(0, 0, 0, 0.8)
        position: absolute
        top: 0
        right: 0
      .pic
        display: inline-block
        width: 100%
        height: 100%
        transition: all .2s
  .upload-img
    img
      max-width: 90%
</style>

<script>
  import { getList, addFile, uploadImg, delImg } from './../../service'
  export default {
    data () {
      return {
        fileList: [],
        isShowNewFile: false,
        isShowUpload: false,
        newContent: '',
        fileName: '',
        newImg: '',
        preUrl: ''
      }
    },
    filters: {
      picStyle (pic) {
        return {
          background: `url(${pic}) center center no-repeat`,
          backgroundSize:'auto 100%'
        }
      }
    },
    methods: {
      showUpload () {
        this.isShowUpload = true
      },
      getList () {
        getList().then((d) => {
          console.log(d)
          this.fileList = d.data
        }).catch((e) => {
          console.log(e)
        })
      },
      add () {
        let fileName = this.fileName
        let newContent = this.newContent

        addFile({
          fileName,
          newContent
        })
      },
      uploadImg (e) {
        this.check()
        return
      },
      changeImg (e) {
        var file = e.target.files[0]
        var form = new FormData()
        form.append('file', file)
        this.newImg = form
        this.preUrl = window.URL.createObjectURL(file)
      },
      check () {
        var file = this.$refs.files.files
        var len = file.lenth

        if (len === 0) {
          alert('请选择图片~~')
          return true
        } 
        console.log(file[0])
        if (file[0].type.indexOf('image') === -1) {
          alert('请上传正确的图片格式~')
          return true
        }
      },
      reset () {
        this.preUrl = ''
        this.isShowUpload = false
      },
      sumbit () {
        if(!this.check()) {
          this.$refs.form.submit()
        }
      },
      delImg (pic) {
        delImg({
          pic
        }).then(() => {
          this.getList()
        }).catch(e => {
          console.log(e)
        })
      },
      watchUpload () {    
        var frame = this.$refs.frame

        frame.onload = () => {
          var t  = frame.contentWindow.document.querySelector('body').innerHTML
          t = t.match(/<.+>(.+)<.+>/, '$1')[1]
          alert('图片上传成功：')
          this.$refs.form.reset()
          this.reset()
          this.getList()
        }
      }
    },
    mounted () {
      this.getList()
      this.watchUpload()
    }
  }
</script>
