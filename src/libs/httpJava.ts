import Cookies from 'js-cookie' 
import axios from 'axios'
import { getSignValue, getMethodToData } from './util'
import URL from './javaUrl'
import { Message } from 'view-ui-plus'
import { useStore } from '@/store'
const store = useStore()

interface ExtendData {
  method?: string
  queryString?: boolean
  newGet?: boolean
}
export default class Request {
  commonAjaxJava(url:string, params:object|undefined={}, extendData:object|undefined): Promise<any> {
    return new Promise((resolve, reject) => {
      this._commonAjax(resolve, reject, url, params, extendData)
    })
  }
  _commonAjax(resolve:any, reject:any, url:string, params:object, extendData:ExtendData|undefined):void {
    const sign = getSignValue(Object.assign(params))
    const token = Cookies.get('token')
    let newHeader:object = {
      token: token,
      sign
    }
    let method = extendData?.method || 'GET'
    let config:any = {
      url: URL + url,
      headers: newHeader,
      method: method,
      async: true,
    }
    if (method.toLowerCase() === 'post') {
      if (extendData && extendData.queryString) {
        config.params = params
      } else {
        config.data = params
      }
    } else {
      if (extendData && extendData.newGet) {
        config.url = URL + (url + getMethodToData(params))
      } else {
        config.params = params
      }
    }
    axios(config).then((da:any) => {
      if(da.data.code == 200) {
        resolve(da.data)
      }else if(da.data.code == 403 || da.data.code == 402 || da.data.code == 3004) {
        Message.error(da.data.message);
        // 登出
        store.logOut()
        localStorage.artTrainingTagNaveList = []
      }else {
        Message.error(da.data.message);
        reject(da.data)
      } 
    }).catch((err:any) => {
      console.log(err)
      Message.error(err);
    })
  }
}