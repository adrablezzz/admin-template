import { defineStore } from 'pinia'
import { initRoute } from '../router/config'
import Cookies from 'js-cookie'
import router from '@/router'
import circularJSON from 'circular-json'

const SYSTEM:string = 'lawSchoolAdmin'
const ROUTESLOG:string = `${SYSTEM}RoutesLog`
export const useStore = defineStore<string, State, Getters, Actions>('UseStoreId', {
  state: () => ({
    token: Cookies.get('token') || '',
    userInfo: {
      id: 0,
      role: 0,
      staffId: "",
      truename: "",
      type: 0,
      username: "",
    },
    systemInfo: {
      systemList: [
        {
          name: '灋学堂',
          value: SYSTEM,
          href: ''
        }
      ],
      active: SYSTEM
    },
    routesLog: []
  }),
  getters: {
    getUserInfo: (state:any) => {
      if(state.userInfo.id) {
        return state.userInfo
      }else if(Cookies.get('userInfo')) {
        return JSON.parse(Cookies.get('userInfo') || '')
      }
      return {}
    },
    getSystemInfo: (state: any) => state.systemInfo,
    getRoutesLog: (state: any) => {
      try {
        let routeString = sessionStorage.getItem(ROUTESLOG)
        if(routeString) {
          let routes = JSON.parse(routeString)
          state.routesLog = [...routes]
        }
      }catch(err) {console.log(err)}
      
      return state.routesLog
    },
    getToken: (state: any) => {
      return state.token || ''
    }
  },
  actions: {
    addRouteLog(route:Route) {
      if(this.routesLog.findIndex((r:any) => r.name == route.name) === -1) {
        this.routesLog.push(route)
        sessionStorage.setItem(ROUTESLOG, circularJSON.stringify(this.routesLog))
      }
    },
    delRouteLog(name: string):number {
      let index:number = this.routesLog.findIndex((r:any) => r.name == name)
      if(index !== -1) {
        this.routesLog.splice(index, 1)
        sessionStorage.setItem(ROUTESLOG, circularJSON.stringify(this.routesLog))
      }
      return index
    },
    clearRouteLog(name?:string) {
      this.routesLog = this.routesLog.filter((r:any) => r.name == initRoute || r.name == name)
      sessionStorage.setItem(ROUTESLOG, circularJSON.stringify(this.routesLog))
    },
    login(token:string, userInfo:UserInfo) {
      Cookies.set('token', token, {expires: 7})
      Cookies.set('userInfo', circularJSON.stringify(userInfo), {expires: 7})
      this.token = token;
      (this.userInfo as UserInfo) = userInfo
    },
    logOut() {
      Cookies.remove('token')
      Cookies.remove('userInfo')
      this.token = ''
      this.userInfo = {
        id: 0,
        role: 0,
        staffId: "",
        truename: "",
        type: 0,
        username: "",
      }
      localStorage.tzBackManageTagNaveList = []
      router.push({ name: 'login'})
    }
  }
})