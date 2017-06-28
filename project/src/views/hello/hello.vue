<template lang="jade">
  .section-hello
    .hello
      p {{ welcomeText }}

</template>
<style lang="stylus">
  .section-hello
    width: 1160px
    margin: 20px auto 0
    .hello
      padding: 0 0 0 20px
</style>

<script>
  export default {
    data () {
      return {
        welcomeText: '欢迎访问'
      }
    }
  }
</script>
