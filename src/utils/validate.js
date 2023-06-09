/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} string
 * @returns {Boolean}
 */
export function validMobile(phonenum) {
  return /^1[3-9]\d{9}$/.test(phonenum)
}
