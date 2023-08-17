import { RouteRecordRaw } from 'vue-router'
import Main from '@/views/main/index.vue'

const mainRoutes:RouteRecordRaw[] = [
  {
    path: '/videoManage',
    name: 'videoManage',
    component: Main,
    children: [
      {
        path: 'videoCheck',
        name: 'videoCheck',
        component: () => import('@/views/videoManage/videoCheck.vue')
      },
      {
        path: 'myWorks',
        name: 'myWorks',
        component: () => import('@/views/videoManage/myWorks.vue')
      },
      {
        path: 'allVideos',
        name: 'allVideos',
        component: () => import('@/views/videoManage/allVideos.vue')
      },
    ]
  },
  {
    path: '/videoManage2',
    name: 'videoManage2',
    component: Main,
    children: [
      {
        path: 'videoCheck2',
        name: 'videoCheck2',
        component: () => import('@/views/videoManage2/videoCheck2.vue')
      },
    ]
  },
]

export default mainRoutes
