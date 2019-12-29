import Axios from 'axios'
import Config from '../config/app.js'
import {Message} from 'element-ui';


const config = {
  baseURL: Config.apiUrl + '/' + Config.apiPrefix,
  timeout: Config.timeout,
  withCredentials: false, // Check cross-site Access-Control
  crossDomain: false//通常适用于jsonp
}

const service = Axios.create(config)//创建实例

service.defaults.retry = Config.requestRetry;

service.defaults.retryDelay = Config.requestRetryDelay;

service.interceptors.request.use(config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)


service.interceptors.response.use(
  response => {

    const res = response
    if (res.status !== 200) {
      Message.error("数据返回错误")
      return false
    } else {
      if(res.data.code == 200){
        Message.success(res.data.msg)
        return res.data
      }else{
        Message.error(res.data.msg)
      }
    }
  },
  error => {
    Message.error(error.response.data.message)
    return Promise.reject(error.response.data)
  }
)

export default service
