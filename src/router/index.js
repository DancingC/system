import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/pages/layout/layout'

Vue.use(Router)

let routes = [{
    path: '/login',
    component: () => import('@/pages/login/login'),
    hidden: true
  },
  {
    path: '/',
    component: layout,
    name: '项目储备库',
    hidden: true,
    children: [
      {
        path: '/projectWrite',
        name: '项目填报',
        component: () => import('@/pages/projecEntry/projectWrite')
      },
      {
        path: '/projectAudit',
        name: '项目审核',
        component: () => import('@/pages/projectAudit/projectAudit')
      },
      {
        path: '/projectReply',
        name: '项目审定',
        component: () => import('@/pages/projectReply/projectReply')
      },
      {
        path: '/projectSubmit',
        name: '项目上报',
        component: () => import('@/pages/projectSubmit/projectSubmit')
      }
      // ,
      // {
      //   path: '/test',
      //   name: '测试页面',
      //   component: () => import('@/pages/test')
      // }
    ]
  }
]

export default new Router({
  'linkActiveClass': 'active',
  mode: 'history',
  routes
})
