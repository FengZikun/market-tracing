import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getSessionStorage(item) {
  return sessionStorage[(item)]
}

export function setSessionStorage(item, data) {
  sessionStorage[(item)] = data
  return
}

export function removeSessionStorage(item, data) {
  sessionStorage[(item)] = data
  return
}
