import request from '@/utils/request'
/**
 *
 *1
 * @export获取审批列表
 * @param {*} params {}
 * @return {*}
 */
export function getApprovalsListAPI(params) {
  return request({
    url: '/approvals/list',
    params
  })
}

export function getApprovalsHistoryAPI(params) {
  return request({
    url: '/approvals/history',
    params
  })
}

/**
 * @description: 添加员工审批信息
 * @param {*} data
 * @return {*}
 */
export function addApprovalsAPI(data) {
  return request({
    method: 'post',
    url: '/approvals/list',
    data
  })
}

/**
 * @description: 获取某一个用户的审批列表
 * @param {*} id
 * @return {*}
 */
export function getapprovalsByID(id) {
  // /approvals/list/:id/
  return request({
    url: `/approvals/list/${id}`
  })
}

/**
 * @description: 获取某一个用户的审批列表
 * @param {*} id
 * @return {*}
 */
export function getapprovalsPendByID(id) {
  // /approvals/list/:id/
  return request({
    url: `/approvals/listPend/${id}`
  })
}
export function getapprovalsAllPendByID() {
  return request({
    url: '/approvals/listAllPend'
  })
}

export function putapprovals(data) {
  return request({
    method: 'put',
    url: '/approvals/list',
    data
  })
}
