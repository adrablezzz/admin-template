import mainRoutes from './routes'

const routes:any =  {
  'videoManage': {
    name: '视频管理',
    icon: 'logo-youtube'
  },
    'videoCheck': '视频审核',
  
  'videoManage2': {
    name: '视频管理2',
    icon: 'ios-apps-outline'
  },
    'videoCheck2': '视频审核2',
}
const initRoute:string = 'videoCheck'
const mainChildrenRoutes = mainRoutes.map((subRoute:any) => {
  return subRoute.children.map((route:any) => route.name)
}).flat(Infinity)

export {
  routes,
  initRoute,
  mainChildrenRoutes
}