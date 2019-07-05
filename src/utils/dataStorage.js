import Storage from 'good-storage'
import Config from '../config/app.js'


export function getUserInfo(key = null) {
  let userInfo = Storage.get(Config.userInfoKey)
  if (key) return userInfo.hasOwnProperty(key) ? userInfo[key] : null
  return userInfo
}


export function setUserInfo(user) {
  Storage.set(Config.userInfoKey, user)
  return user
}

export function getToken() {
  return Storage.session.get(Config.tokenKey)
}

export function setToken(token) {
  console.log(token)
  return Storage.session.set(Config.tokenKey, token)
}

export function removeToken() {
  return Storage.session.remove(Config.tokenKey)
}


export function isLogin() {
  return (getToken() || '').length > 5
}
