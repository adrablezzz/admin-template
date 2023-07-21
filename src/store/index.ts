import { defineStore } from 'pinia'
import { initRoute } from '../router/config'
import Cookies from 'js-cookie'

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
          value: 'lawSchoolAdmin',
          href: ''
        }
      ],
      active: 'lawSchoolAdmin'
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
    getRoutesLog: (state: any) => state.routesLog,
    getToken: (state: any) => state.token || Cookies.get('token') || ''
  },
  actions: {
    addRouteLog(route:object) {
      if(this.routesLog.findIndex((r:object) => r.name == route.name) === -1) {
        this.routesLog.push(route)
      }
    },
    delRouteLog(name: string):number {
      let index:number = this.routesLog.findIndex((r:object) => r.name == name)
      if(index !== -1) {
        this.routesLog.splice(index, 1)
      }
      return index
    },
    clearRouteLog(name?:string) {
      this.routesLog = this.routesLog.filter((r:object) => r.name == initRoute || r.name == name)
    },
    login(token:string, userInfo:object) {
      Cookies.set('token', token)
      Cookies.set('userInfo', JSON.stringify(userInfo))
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