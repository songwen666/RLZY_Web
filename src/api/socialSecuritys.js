import request from '@/utils/request'

// 获取
export function getsocialSecuritysAPI() {
  return request({
    url: '/social/security'
  })
}

export function getsocialSecuritysById(id) {
  return request({
    url: `/social/security/${id}`,
    method: 'get'
  })
}

export function putsocialSecuritysAPI(data) {
  return request({
    url: '/social/security',
    method: 'put',
    data
  })
}

export function postsocialSecuritysAPI(data) {
  return request({
    url: '/social/security/batch',
    method: 'post',
    data
  })
}
