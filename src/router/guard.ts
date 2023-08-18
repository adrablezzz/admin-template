import router from './index'
import { useStore } from '@/store'
import { initRoute, mainChildrenRoutes } from './config'
const guard = () => {
  const store = useStore()
  router.beforeEach((to, _from, next) => {
    let index = store.getRoutesLog.findIndex((r:any) => r.name === initRoute)
    if(index === -1) {
      store.addRouteLog({name: initRoute})
    }
    if(mainChildrenRoutes.includes(to.name as string)) {
      store.addRouteLog({name: to.name as string})
    }
    let token = store.getToken
    if(!token && to.name !== 'login') {
      next({name: 'login'})
    }else if(token && to.name == 'login') {
      next('/')
    }else {
      next()
    }
  })
}

export default guard