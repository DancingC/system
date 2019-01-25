import Vue from 'vue'
import Router from 'vue-router'

import publicEdit from '@/pages/ProjectManagement/publicEdit'
import publicDis from '@/pages/discharge/publicDis'
import publicRem from '@/pages/Removal/publicRem'

Vue.use(Router)

let routes = [
  {
    path: '/ProjectManagement',
    component: publicEdit,
    name: '项目管理',
    children: [
      {
        path: '/',
        name: '项目管理',
        component: () => import('@/pages/ProjectManagement/projectPM'),
        hidden: true
      },
      {
        path: 'projectEdit',
        name: '项目编辑',
        component: () => import('@/pages/ProjectManagement/proEdit/projectEdit'),
        hidden: true
      }
    ]
  },
  {
    path: '/discharge',
    component: publicDis,
    name: '综合防治',
    children: [
      {
        path: '/',
        name: '综合防治',
        component: () => import('@/pages/discharge/discharge')
      },
      {
        path: 'disEdit',
        name: '综合编辑',
        component: () => import('@/pages/discharge/disEdit/disEdit')
      }
    ]
  },
  {
    path: '/removal',
    component: publicRem,
    name: '避让搬迁',
    children: [
      {
        path: '/',
        name: '避让搬迁',
        component: () => import('@/pages/Removal/removal')
      },
      {
        path: 'remEdit',
        name: '搬迁编辑',
        component: () => import('@/pages/Removal/remEdit/remEdit')
      }
    ]
  }
]

export default new Router({
  'linkActiveClass': 'active',
  mode: 'history',
  routes
})
