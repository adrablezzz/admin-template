import mainRoutes from './routes'
import { RouteRecordRaw } from 'vue-router'

const routes: router.ConfigRoutes =  {
  'videoManage': {
    name: '视频管理',
    icon: 'logo-youtube'
  },
    'videoCheck': '视频审核',
    'myWorks': '我的视频',
    'allVideos': '全部视频',
  
  'videoManage2': {
    name: '视频管理2',
    icon: 'ios-apps-outline'
  },
    'videoCheck2': '视频审核2',
}
const initRoute:string = 'videoCheck'
const mainChildrenRoutes = mainRoutes.map((subRoute:RouteRecordRaw) => {
  return (subRoute?.children || []).map((route:RouteRecordRaw) => route.name)
}).flat(Infinity)

export {
  routes,
  initRoute,
  mainChildrenRoutes
}