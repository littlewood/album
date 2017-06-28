import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

import { hello, album, config } from './../views'

var router = new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/',
      component: hello
    },
    {
      name: 'album',
      path: '/album',
      component: album
    },
    {
      name: 'config',
      path: '/config',
      component: config
    }
  ]
})

export default router