import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'
import TrainWork from '@/components/TrainWork/TrainWork'
import discharge from '@/components/discharge/discharge'
import removal from '@/components/Removal/removal'

Vue.use(Router)
console.log(App)
let routes = [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '/TrainWork',
        component: TrainWork,
        name: '防治体系'
      },
      {
        path: '/discharge',
        component: discharge,
        name: '排危除险'
      },
      {
        path: '/removal',
        component: removal,
        name: '避让搬迁'
      }
    ]
  }
]

let router = new Router({
  // 'mode': 'history', 去掉URL的#号，需要配置服务器http://router.vuejs.org/zh-cn/essentials/history-mode.html
  'linkActiveClass': 'active',
  routes
})

export default new Router({
  router
})
