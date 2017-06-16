<template lang="jade">
  div
    nav-bar
    router-view
</template>
<script>
  import navBar from './components/nav-bar.vue'
  export default {
    data () {
      return {
      }
    },
    components: {
      navBar
    },
    methods: {

    },
    mounted () {

    }
  }
</script>

