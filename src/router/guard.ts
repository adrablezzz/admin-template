import router from './index'
import { useStore } from '@/store'
import { initRoute, mainChildrenRoutes } from './config'

const guard = () => {
  const store = useStore()
  router.beforeEach((to, from, next) => {
    let index = store.getRoutesLog.findIndex((r:object) => r.name === initRoute)
    if(index === -1) {
      store.addRouteLog({name: initRoute})
    }
    if(mainChildrenRoutes.includes(to.name)) {
      store.addRouteLog(to)
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