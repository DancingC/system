import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/app.css'
import './assets/css/reset.css'
import projectPM from './components/ProjectManagement/projectPM'
import discharge from './components/discharge/discharge'
import removal from './components/Removal/removal'
import proEdit from './components/ProjectManagement/proEdit/projectEdit'
import disEdit from './components/discharge/disEdit/disEdit'
import remEdit from './components/Removal/remEdit/remEdit'

Vue.use(ElementUI)
Vue.use(Router)

let routes = [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '/ProjectManagement',
        component: projectPM,
        name: '项目管理',
        children: [
          {
            path: '/proEdit',
            component: proEdit,
            name: 'edit'
          }
        ]
      },
      {
        path: '/discharge',
        component: discharge,
        name: '综合防治'
      },
      {
        path: '/removal',
        component: removal,
        name: '避让搬迁'
      },
      {
        path: '/discharge/disEdit',
        component: disEdit
      },
      {
        path: '/Removal/remEdit',
        component: remEdit
      }
    ]
  }
]

let router = new Router({
  'linkActiveClass': 'active',
  mode: 'history',
  routes
})

/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  router
})
export default app
