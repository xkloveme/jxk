/**
 * 脱敏姓名
 * @author xkloveme <xkloveme@gmail.com>
 * @category  mask
 * @alias mask_name
 * @param {string}  name 脱敏姓名
 * @returns {String} 返回脱敏手机号
 * @summary mask_phone('13968341859')
 * @example
 * improt { mask_name } from 'jxk'
 * mask_name('jxk') // *xk
 */
export default (str) => {
  if (!str) return null
  if (str.length <= 3) {
    return '*' + str.substring(1, str.length)
  } else if (str.length > 3 && str.length <= 6) {
    return '**' + str.substring(2, str.length)
  } else if (str.length > 6) {
    return str.substring(0, 2) + '****' + str.substring(6, str.length)
  }
};