import env from '../../config/myenv'

const DEV_URL = 'https://happybikeapi.cyi365.com/securityInterface/api'
const PRO_URL = ''
let URL = ''
if (env === 'development') {
  URL = DEV_URL
}else {
  URL = PRO_URL
}
export default URL