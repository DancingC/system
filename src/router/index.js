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
    children: [{
        path: '/',
        component: layout,
        name: '项目填报',
        hidden: true,
        children: [{
            path: '/',
            component: layout,
            name: '治理工程',
            hidden: true,
            children: [{
                path: '/',
                name: '治理工程',
                component: () => import('@/pages/projecEntry/project/projectPM'),
                hidden: true
              },
              {
                path: '/projectEdit',
                name: '项目编辑',
                component: () => import('@/pages/projecEntry/project/proEdit/projectEdit'),
                hidden: true
              }
            ]
          },
          {
            path: '/projecEntry/discharge',
            component: layout,
            name: '排危除险',
            hidden: true,
            children: [{
                path: '/',
                name: '排危除险',
                component: () => import('@/pages/projecEntry/discharge/discharge'),
                hidden: true
              },
              {
                path: 'disEdit',
                name: '排险编辑',
                component: () => import('@/pages/projecEntry/discharge/disEdit/disEdit'),
                hidden: true
              }
            ]
          },
          {
            path: '/projecEntry/removal',
            component: layout,
            name: '避让搬迁',
            hidden: true,
            children: [{
                path: '/',
                name: '避让搬迁',
                component: () => import('@/pages/projecEntry/removal/removal'),
                hidden: true
              },
              {
                path: 'remEdit',
                name: '搬迁编辑',
                component: () => import('@/pages/projecEntry/removal/remEdit/remEdit'),
                hidden: true
              }
            ]
          }
        ]
      },
      {
        path: '/projectAudit',
        name: '项目审核',
        component: () => import('@/pages/projectAudit/projectAudit')
      },
      {
        path: '/projectReply',
        name: '项目上报',
        component: () => import('@/pages/projectReply/projectReply')
      },
      {
        path: '/projectSubmit',
        name: '项目批复',
        component: () => import('@/pages/projectSubmit/projectSubmit')
      }
    ]
  }
]
console.log(routes[1].children)
export default new Router({
  'linkActiveClass': 'active',
  mode: 'history',
  routes
})
