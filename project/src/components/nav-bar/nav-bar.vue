<template lang="jade">
  div.nav-bar
    .nav-bar-cntr
      ul.list
        li.item(v-for="nav in NavConfig", :class="{active: pageType===nav.type}")
          router-link(:to="nav.link") {{ nav.text }}
</template>
<style lang="stylus">
  .nav-bar
    background: #fff
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.5)
    .nav-bar-cntr
      max-width: 1160px
      height: 30px
      line-height: 30px
      margin: 0 auto
    .list
      margin: 0 0 3px 0
    .item
      margin: 0 10px
      display: inline-block
      transition: all .2s
      position: relative
      text-align: center
      transition: all .2s
      &:after
        text-align: center
        margin: 0 auto
        transition: all .2s
        content: ''
        display: block
        height: 2px
        width: 0px
        background: #000
        position: relative
        bottom: 0
      &:hover
      &.active
        a
          color: #000
        &:after
          width: 100%
      a
        padding: 0 20px
        margin: 0
        color: #999
        text-decoration none
        font-style: normal
</style>
<script>
  import { NavConfig } from './../../config'

  export default {
    data () {
      return {
        NavConfig
      }
    },
    computed: {
      pageType () {
        return this.$route.name
      }
    }
  }
</script>

