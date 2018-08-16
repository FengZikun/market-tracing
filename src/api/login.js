import request from '@/utils/request'

export function login(username, passwd) {
  return request({
    url: '/POST/user/login',
    method: 'post',
    params: {
      username,
      passwd
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/POST/user/logout',
    method: 'post',
    params: {
      token
    }
  })
}
