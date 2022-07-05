import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  // 创建一个有效时间为7天的cookie    Cookies.set(name, value, { expires: 7 })
  return Cookies.set(TokenKey, token) //由于没有设置失效时间，默认失效时间为该网站关闭时
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
