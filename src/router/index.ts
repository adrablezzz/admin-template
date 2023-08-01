import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { initRoute } from './config'
import mainRoutes from './routes'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: {
      name: initRoute
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  ...mainRoutes
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router