import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

import hello from './../views/hello'
import album from './../views/album'
console.log(album)
var router = new VueRouter({
  routes: [
    {
      path: '/',
      component: hello
    },
    {
      path: '/album',
      component: album
    }
  ]
})

export default router