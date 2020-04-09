import request from '@/utils/request.js'

export function login(params) {
  return request.post("/user/login",params)
}
