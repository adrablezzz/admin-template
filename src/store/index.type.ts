interface SystemItem {
  name: string
  value: string
  href: string
}
interface Route {
  name: string;
  [other:string]: any
}
interface UserInfo {
  id: number
  role: number
  staffId: string
  truename: string
  type: number
  username: string | number
}
type State = {
  token: string
  userInfo: {
    id: number
    role: number
    staffId: string
    truename: string
    type: number
    username: string | number
  }
  systemInfo: {
    systemList: SystemItem[]
    active: string
  },
  routesLog: object[]
}

type Getters = {
  getUserInfo: (state: State) => object
  getSystemInfo: (state: State) => SystemItem[]
  getRoutesLog: (state: State) => object[]
  getToken: (state: State) => string
}

type Actions = {
  addRouteLog: (route: Route) => void
  delRouteLog: (name: string) => number
  clearRouteLog: (name?:string|any) => void
  login: (token:string, userInfo:UserInfo) => void
  logOut: () => void
}