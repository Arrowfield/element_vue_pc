import request from '../utils/request.js'

export function login(params) {
  return request.post("/auth/login",params)
}

export function sendSMS(params) {
  return request({
    closeLoading:true,//closeInterceptors:true  (请求没有Loading，请求没有拦截)
    url: '/pc/sendsms',
    method: 'get',
    params: params
  })
}
