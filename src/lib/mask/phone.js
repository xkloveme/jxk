/**
 * 脱敏手机号
 * @author xkloveme xkloveme@gmail.com
 * @category  mask
 * @alias mask_phone
 * @param {string}  phone 手机号
 * @returns {String} 返回脱敏手机号
 * @summary mask_phone('13968341859')
 * @example
 * improt { mask_phone } from 'jxk'
 * mask_phone('13968341859') // 139****1859
 */
export default (phone) => {
  return phone ? phone.replace(/(\d{3})\d*(\d{4})/, '$1****$2') : null
};