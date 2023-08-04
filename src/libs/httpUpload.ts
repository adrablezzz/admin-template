import axios from "axios";
import URL from './javaUrl'
import Cookies from "js-cookie";
import { Message } from "view-ui-plus";

export default class UploadFile {
  axiosUpload(url: string, formData: FormData) {
    return new Promise((resolve, reject) => {
      axios.post(URL + url, formData, {
        headers: {
          token: Cookies.get('token'),
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        if(res.data.code == 200) {
          resolve(res.data)
        }else {
          Message.error(res.data.message);
          reject(res.data.message)
        }
      }).catch(err => {
        Message.error(err);
        reject(err)
      })
    })
  }
}