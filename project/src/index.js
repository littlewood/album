import vue from 'vue'
import app from './app.vue'
import router from './router'
import './page.styl'

new vue({
  el: '#app',
  router,
  data: {
    intro: 'welcome1'
  },
  components: {
    app  
  }
})