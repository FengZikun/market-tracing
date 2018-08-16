import request from '@/utils/request'

export function addTracingSysUser(data) {
  return request({
    url: '/POST/user/addTracingSysUser',
    method: 'post',
    params: data
  })
}

export function findTracingSysUserList(data) {
  return request({
    url: '/POST/user/findTracingSysUserList',
    method: 'post',
    params: {
      token: data
    }
  })
}

export function findTracingSysUserByPage(params) {
  return request({
    url: '/POST/user/findTracingSysUserByPage',
    method: 'post',
    params: params
  })
}

export function managerDeleteTracingSysUserById(params) {
  return request({
    url: '/POST/user/managerDeleteTracingSysUserById',
    method: 'post',
    params: params
  })
}

export function managerChangeTracingSysUserRightById(params) {
  return request({
    url: '/POST/user/managerChangeTracingSysUserRightById',
    method: 'post',
    params: params
  })
}

export function registerCenterCommonUser (params) {
  return request({
    url: '/POST/user/registerCenterCommonUser',
    method: 'post',
    params: params
  })
}

export function findCenterUserByPage (params) {
  return request({
    url: '/POST/CenterUser/findCenterUserByPage',
    method: 'post',
    params: params
  })
}

export function findSingleUserByToken (params) {
  return request({
    url: '/GET/User/findSingleUserByToken',
    method: 'get',
    params: params
  })
}