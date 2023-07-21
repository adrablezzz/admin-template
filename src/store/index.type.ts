interface SystemItem {
  name: string
  value: string
  href: string
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
  addRouteLog: (route: object) => void
  delRouteLog: (name: string) => number
  clearRouteLog: () => void
  login: (token:string, userInfo:object) => void
  logOut: () => void
}