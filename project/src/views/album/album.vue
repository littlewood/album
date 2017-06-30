<template lang="jade">
  div.section-album
    div.title
      p.tit 
        span.btn-new(@click="showUpload") 上传图片
    ul.album(v-if="isShowList")
      li.item(v-for="item in fileList", :key="item") 
        span.pic(:style="item | picStyle")
        i.del(@click="delImg(item)") x
    div.tip(v-if="!isShowList") 这里一无所有， 快上传一点图片吧~~~~

    div(class="upload-img", ref="dialog")
      transition(name="dialog")
        div.upload-dialog(v-show="isShowUpload")
          div.upload-cntr
            iframe(name="uploadFrame", id="uploadFrame", style="display:none;", ref="frame")
            form(action="/uploadImg", method="post", enctype="multipart/form-data", target="uploadFrame", ref="form")
              div.select-pic
                input.file(type="file", name="file", @change="changeImg", ref="files")
                input.button(type="button", value="提交", @click="sumbit")
                input.button(type="reset", value="取消", @click="reset")
            div.preview
              img.pre-pic(:src="preUrl")
          .close(@click="clickClose") x
      .mask(v-show="isShowUpload")
</template>
<style lang="stylus">
  .section-album
    max-width: 1160px
    margin: 0 auto
    padding: 20px
  .title
    position: relative
    .btn-new
      cursor: pointer
      position: absolute
      right: 0
  .album
    margin: 15px auto
    display: flex
    flex-flow: row wrap
    &:after
      content: ''
      display: block
      clear: both
    .item
      // float: left
      position: relative
      margin: 20px 15px
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.5)
      box-sizing: border-box
      width: 150px
      height: 200px
      // overflow: hidden
      border-radius: 3px
      &:hover
        .pic
          background-size: auto 120%
      &:hover
        .del
          display: block
      .del
        display: none
      .pic
        display: inline-block
        width: 100%
        height: 100%
        transition: all .2s
        background-size: auto 100%
  .upload-img
    .upload-dialog
      background #fff
      width: 90%
      height: 90%
      padding: 10px
      border: 1px solid #ccc
      border-radius: 5px
      position: fixed
      top: 5%
      left: 5%
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.5)    
      z-index: 10
      &.dialog-enter-active
        animation: dialog-in .2s
      &.dialog-leave-active
        animation: dialog-out .2s
    .upload-cntr
      width: 100%
      height: 100%
    .mask
      content: ''
      position: fixed
      height: 100%
      width: 100%
      background: rgba(0, 0, 0, 0.5)
      top: 0
      left: 0
      z-index: 9
    .select-pic
      margin: 10px 0 0
    .button
      margin: 0 5px
    .preview
      width: 95%
      height: 90%
      overflow-y: scroll
      margin: 15px auto 0
    .pre-pic
      height: auto
      width: auto
      max-width: 100%
      margin: 0 auto
      display: block
  

  @keyframes dialog-in {
    0% {
      top: -100%
    }
    80% {
      top: 5%
    }

    90% {
      top: 4%
    }
    100% {
      top: 5%
    }
  }
  @keyframes dialog-out {
    0% {
      top: -5%
    }
    80% {
      top: -90%
    }
    100% {
      top: -100%
    }
  }
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
        preUrl: '',
        isOut: false
      }
    },
    computed: {
      isShowList () {
        return this.fileList.length > 0
      }
    },
    filters: {
      picStyle (pic) {
        return {
          backgroundImage: `url(${pic})`,
          backgroundPosition: 'center'
        }
      }
    },
    methods: {
      closeUpload () {
        this.isShowUpload = false
      },
      showUpload () {
        this.isShowUpload = true
      },
      getList () {
        getList().then((result) => {
          this.fileList = result.data.data
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

      /**
       * 预览图片
      */
      changeImg (e) {
        let file = e.target.files[0]
        let form = new FormData()
        form.append('file', file)
        this.newImg = form
        this.preUrl = window.URL.createObjectURL(file)
      },
      check () {
        let file = this.$refs.files.files
        let len = file.length

        if (len === 0) {
          alert('请选择图片~~')
          return true
        } 

        if (file[0].type.indexOf('image') === -1) {
          alert('请上传正确的图片格式~')
          return true
        }
      },
      reset () {
        this.preUrl = ''
        // this.isOut = true
        // this.$refs.dialog.
        this.closeUpload()
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
        let frame = this.$refs.frame

        frame.onload = () => {
          let result  = frame.contentWindow.document.querySelector('body').innerHTML
          result = result.match(/<.+>(.+)<.+>/, '$1')[1]
          alert('图片上传成功：')

          this.$refs.form.reset()
          this.reset()
          this.getList()
        }
      },
      clickClose () {
        this.reset()
      }
    },
    mounted () {
      this.getList()
      this.watchUpload()
    }
  }
</script>
