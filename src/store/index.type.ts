interface SystemItem {
  name: string;
  value: string;
  href: string;
}
interface SystemInfo {
  systemList: SystemItem[];
  active: string;
}
interface Route {
  name: string;
}
interface UserInfo {
  id: number;
  role: number;
  staffId: string;
  truename: string;
  type: number;
  username: string | number;
}
type State = {
  token: string;
  userInfo: {
    id: number;
    role: number;
    staffId: string;
    truename: string;
    type: number;
    username: string | number;
  };
  systemInfo: SystemInfo
  routesLog: { name: string }[];
};

type Getters = {
  getUserInfo: (state: State) => UserInfo;
  getSystemInfo: (state: State) => SystemInfo;
  getRoutesLog: (state: State) => { name: string }[];
  getToken: (state: State) => string;
};

type Actions = {
  addRouteLog: (route: Route) => void;
  delRouteLog: (name: string) => number;
  clearRouteLog: (name?: string | any) => void;
  login: (token: string, userInfo: UserInfo) => void;
  logOut: () => void;
};
