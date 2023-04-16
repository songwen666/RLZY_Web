import request from '@/utils/request'

//
export function getSalarysAPI(id) {
  return request({
    url: 'social/salarys'
  })
}

export function getSalarysByidAPI(id) {
  return request({
    url: `social/salarys/${id}`
  })
}

export function putSalarysAPI(data) {
  return request({
    url: 'social/salarys',
    method: 'put',
    data
  })
}

export function postsalarysbatchAPI(data) {
  return request({
    url: 'social/salarys/batch',
    method: 'post',
    data
  })
}

