import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/pages/layout/layout'

Vue.use(Router)

let routes = [
  {
    path: '/',
    component: layout,
    name: '首页',
    children: [
      {
        path: '',
        component: () => import('@/pages/login/login'),
        hidden: true
      },
      {
        path: '/content',
        component: () => import('@/pages/content'),
        name:'主页面',
        children:[
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
          },
          {
            path: '/',
            component: layout,
            name: '项目管理',
            hidden: true,
            children: [
              {
                path: '/pro_zzjc',
                name: '专职监测',
                component: () => import('@/pages/projectManage/pro_zzjc')
              },
              {
                path: '/pro_gczl',
                name: '工程治理',
                component: () => import('@/pages/projectManage/pro_gczl')
              },
              {
                path: '/pro_pwcx',
                name: '排危除险',
                component: () => import('@/pages/projectManage/pro_pwcx')
              },
              {
                path: '/pro_zhzz',
                name: '综合整治',
                component: () => import('@/pages/projectManage/pro_zhzz')
              },
              {
                path: '/pro_bxbq',
                name: '避险搬迁',
                component: () => import('@/pages/projectManage/pro_bxbq')
              },
              {
                path: '/pro_nljs',
                name: '能力建设',
                component: () => import('@/pages/projectManage/pro_nljs')
              },
              {
                path: '/pro_zdhjc',
                name: '自动化监测',
                component: () => import('@/pages/projectManage/pro_zdhjc')
              }
            ]
          }
        ]
      },
    ]
  }  
]

export default new Router({
  'linkActiveClass': 'active',
  mode: 'history',
  routes
})
