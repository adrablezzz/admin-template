import {routes} from "@/router/config";
import hexMd5 from 'js-md5'
import { RouteRecordName } from 'vue-router'

export const getRouteName = (name: RouteRecordName | undefined = ''): string =>
  routes[name] instanceof Object ? (routes[name].name || name) : (routes[name] || name);

export const getRouteIcon = (name: RouteRecordName | undefined = ''): string =>
  routes[name] instanceof Object ? routes[name].icon : "";

export const getSignValue = (params:{[key:string]:any}):string => {
  let keyAry = []
  let valueAry = []
  for (let key in params) {
    keyAry.push(key)
    valueAry.push(params[key])
  }
  valueAry.sort()

  let str = ''
  for (let i = 0; i < valueAry.length; ++i) {
    str = str + '' + valueAry[i]
  }
  return hexMd5(str)
}

// GET请求返回拼接参数
export const getMethodToData = (data:{[key:string]:any}):string => {
  let urlStr = "?";
  for (let key in data) {
    if (typeof data[key] === "string") {
      // 如果传入参数包含字符串则执行此步骤
      urlStr += key + "=" + data[key] + "&";
    } else {
      urlStr += key + "=" + encodeURIComponent(JSON.stringify(data[key])) + "&";
    }
  }
  const newUrl = urlStr.substring(0, urlStr.length - 1);
  return newUrl;
};