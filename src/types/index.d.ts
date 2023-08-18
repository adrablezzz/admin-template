declare namespace router {
  interface ConfigRoutes {
    [key:string]: {
      name: string;
      icon: string;
    } | string | any
  }
}

