import request from '@/utils/request'
/**
 *
 *
 * @export查询考勤数据列表
 * @param {*}
 * @return {*}
 */
// 查询考勤数据列表
export function getAttendanceListAPI(params) {
  return request({
    url: '/attendences/list',
    params
  })
}
/**
 *
 *
 * @export查询考勤数据列表
 * @param {*}
 * @return {*}
 */
// 查询考勤数据列表
export function getAttendenceByidAPI(params) {
  return request({
    url: '/attendences/clocklist',
    method: 'get',
    params
  })
}

// // 查询
export function postAttendenceAPI(data) {
  return request({
    url: '/attendences/clocklist',
    method: 'POST',
    data
  })
}

export function getMyselfAttendenceByid(id) {
  return request({
    url: `/attendences/myself/${id}`
  })
}

export function postattendencebatch(data) {
  return request({
    url: '/attendences/batch',
    method: 'POST',
    data
  })
}

