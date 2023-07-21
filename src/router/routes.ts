import { RouteRecordRaw } from 'vue-router'
import Main from '@/views/main'

// 视频子路由
const mainRoutes:RouteRecordRaw[] = [
  {
    path: '/videoManage',
    name: 'videoManage',
    component: Main,
    children: [
      {
        path: 'videoCheck',
        name: 'videoCheck',
        component: () => import('@/views/videoManage/videoCheck')
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
        component: () => import('@/views/videoManage/videoCheck2')
      },
    ]
  },
]

export default mainRoutes
