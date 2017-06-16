<template lang="jade">
  div.nav-bar
    .nav-bar-cntr
      ul.list
        li.item
          router-link(to="/")  开始
        li.item 
          router-link(to="/album") Album
</template>
<style lang="stylus">
  .nav-bar
    .nav-bar-cntr
      max-width: 1360px
      margin: 0 auto
    .item
      margin: 0 10px
      display: inline-block
      a
        color: #999
        font-style: normal
</style>
<script>
  export default {
    
  }
</script>

