<template lang="jade">
  .hello
    p 欢迎使用！

    p 这是一个 webpack + vue + express 搭建的一个相册demo
</template>
<style lang="stylus">
  .hello
    width: 1360px
    margin: 0 auto
</style>

<script>
  export default {
    mounted () {
      console.log(this)
    }
  }
</script>
