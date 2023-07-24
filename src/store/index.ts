import { defineStore } from 'pinia'
import { initRoute } from '../router/config'
import Cookies from 'js-cookie'

const SYSTEM:string = 'lawSchoolAdmin'
const ROUTESLOG:string = `${SYSTEM}RoutesLog`
export const useStore = defineStore<string, State, Getters, Actions>('UseStoreId', {
  state: () => ({
    token: '',
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
        return JSON.parse(Cookies.get('userInfo'))
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
    getToken: (state: any) => state.token || Cookies.get('token') || ''
  },
  actions: {
    addRouteLog(route:object) {
      if(this.routesLog.findIndex((r:object) => r.name == route.name) === -1) {
        this.routesLog.push(route)
        sessionStorage.setItem(ROUTESLOG, JSON.stringify(this.routesLog))
      }
    },
    delRouteLog(name: string):number {
      let index:number = this.routesLog.findIndex((r:object) => r.name == name)
      if(index !== -1) {
        this.routesLog.splice(index, 1)
        sessionStorage.setItem(ROUTESLOG, JSON.stringify(this.routesLog))
      }
      return index
    },
    clearRouteLog(name?:string) {
      this.routesLog = this.routesLog.filter((r:object) => r.name == initRoute || r.name == name)
      sessionStorage.setItem(ROUTESLOG, JSON.stringify(this.routesLog))
    },
    login(token:string, userInfo:object) {
      Cookies.set('token', token, {expires: 7})
      Cookies.set('userInfo', JSON.stringify(userInfo), {expires: 7})
      this.token = token
      this.userInfo = userInfo
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
    }
  }
})