import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/app.css'
import './assets/css/reset.css'

Vue.use(ElementUI)

/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  router
})
export default app
