import Vue from 'vue'
import Router from 'vue-router'

import publicEdit from '@/pages/pm/project/publicEdit'
import publicDis from '@/pages/pm/discharge/publicDis'
import publicRem from '@/pages/pm/removal/publicRem'

Vue.use(Router)

let routes = [
  {
    path: '/pm/project',
    component: publicEdit,
    name: '项目管理',
    children: [
      {
        path: '/',
        name: '项目管理',
        component: () => import('@/pages/pm/project/projectPM'),
        hidden: true
      },
      {
        path: 'projectEdit',
        name: '项目编辑',
        component: () => import('@/pages/pm/project/proEdit/projectEdit'),
        hidden: true
      }
    ]
  },
  {
    path: '/pm/discharge',
    component: publicDis,
    name: '综合防治',
    children: [
      {
        path: '/',
        name: '综合防治',
        component: () => import('@/pages/pm/discharge/discharge')
      },
      {
        path: 'disEdit',
        name: '综合编辑',
        component: () => import('@/pages/pm/discharge/disEdit/disEdit')
      }
    ]
  },
  {
    path: '/pm/removal',
    component: publicRem,
    name: '避让搬迁',
    children: [
      {
        path: '/',
        name: '避让搬迁',
        component: () => import('@/pages/pm/removal/removal')
      },
      {
        path: 'remEdit',
        name: '搬迁编辑',
        component: () => import('@/pages/pm/removal/remEdit/remEdit')
      }
    ]
  }
]

export default new Router({
  'linkActiveClass': 'active',
  mode: 'history',
  routes
})
