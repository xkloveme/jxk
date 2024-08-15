/**
 * 脱敏身份证号
 * @author xkloveme xkloveme@gmail.com
 * @category  mask
 * @alias mask_idcard
 * @param {string} idcard 身份证号
 * @returns {String} 返回脱敏身份证号
 * @summary mask_idcard('420101197208271072')
 * @example
 * improt { mask_idcard } from 'jxk'
 * mask_idcard('420101197208271072') // 4**********2
 */
export default (idcard) => {
  return idcard ? idcard.replace(/(\w{1})\w*(\w{1})/, '$1**********$2') : ''
};