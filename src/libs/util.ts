import {routes} from "@/router/config";
import hexMd5 from 'js-md5'

export const getRouteName = (name: string): string =>
  routes[name] instanceof Object ? routes[name].name : routes[name];

export const getRouteIcon = (name: string): string =>
  routes[name] instanceof Object ? routes[name].icon : "";

export const getSignValue = (params:object):string => {
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
export const getMethodToData = (data:object):string => {
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