import request from '@/utils/request'
/**
 *
 *1
 * @export获取员工列表
 * @param {*} params {page:当前页,size：每页条数}
 * @return {*}
 */
export function getEmployeeListAPI(params) {
  return request({
    url: '/sys/user',
    params
  })
}
// test
export function getmyselfdetailAPI(data) {
  return request({
    url: `/sys/user/${data.id}`
  })
}

// 获取城市
// ??? 这是attendence attendencr-page- ....
export function getcityListAPI() {
  return request({
    url: '/sys/city'
  })
}
export function addAPI(data) {
  return request({
    url: '/employees',
    method: 'post',
    data
  })
}
// export const add = data => createAPI('/employees', 'post', data)
// export const jobnumber = data => createAPI('/employees/jobnumber', 'get', data)

// export function jobnumberAPI() {
//   return request({
//     url: '/employees/jobnumber'
//   })
// }

/** 1
 * @description: 添加员工
 * @param {*} data
 * @return {*}
 */
export function addEmployeeAPI(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}
/**
 *
 *1
 * @export 删除员工
 * @param {*} id 员工id
 * @return {*}
 */
export function delEmployeeAPI(id) {
  return request({
    method: 'delete',
    url: `/sys/user/${id}`
  })
}
// /**
//  *
//  *
//  * @export 批量导入员工 [{},{},{}]
//  * @param {*} data
//  * @return {*}员工数组
//  */
// export function importEmployeeAPI(data) {
//   return request({
//     url: '/sys/user/batch',
//     method: 'post',
//     data
//   })
// }
/**
 *
 *
 * @export 批量导入员工 [{},{},{}]
 * @param {*} data
 * @return {*}员工数组
 */
export function importEmployeeAPI(data) {
  return request({
    url: '/sys/batch',
    method: 'post',
    data
  })
}

/**
 * @description: 保存员工信息
 * @param {*} data
 * @return {*}
 */
export function saveUserDetailByIdAPI(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

// /**
//  * @description: 为员工分配角色
//  * @param {*} data { id:当前用户id, roleIds:选中的角色id组成的数组 }
//  * @return {*}
//  */
// export function assignRolesAPI(data) {
//   return request({
//     url: '/sys/user/assignRoles',
//     method: 'put',
//     data
//   })
// }

/**
 * @description: 为员工分配角色
 * @param {*} data { id:当前用户id, roleIds:选中的角色id组成的数组 }
 * @return {*}
 */
export function assignRolesAPI(data) {
  return request({
    url: '/sys/assignRoles',
    method: 'put',
    data
  })
}
