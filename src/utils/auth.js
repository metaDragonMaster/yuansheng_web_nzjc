import Cookies from 'js-cookie'

const TokenKey = 'Authorization'
const DOMAIN = process.env.VUE_APP_BASE_DOMAIN;

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token,expires) {
    if(expires) {
        expires = new Date(new Date().getTime() + expires * 1000)
    }
    return Cookies.set(TokenKey, token,{ expires: expires ,domain:DOMAIN})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
