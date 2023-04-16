import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const IDKey = 'rlzy-user-ID'

export function getID() {
  return Cookies.get(IDKey)
}

export function setID(token) {
  return Cookies.set(IDKey, token)
}

export function removeID() {
  return Cookies.remove(IDKey)
}
