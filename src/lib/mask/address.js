/**
 * 脱敏地址
 * @author xkloveme <xkloveme@gmail.com>
 * @category  mask
 * @alias mask_address
 * @param {string}   address 地址
 * @returns {String} 返回脱敏地址
 * @summary mask_address('13968341859')
 * @example
 * improt { mask_address } from 'jxk'
 * mask_address('江苏省南京市鼓楼区中山路 18 号德基广场写字楼 16 层') // 江苏****鼓楼区中山路 18 号德基广场写字楼 16 层
 */
export default (address) => {
  if (!address) return null
  if (address.length <= 3) {
    return '*' + address.substring(1, address.length)
  } else if (address.length > 3 && address.length <= 6) {
    return '**' + address.substring(2, address.length)
  } else if (address.length > 6) {
    return address.substring(0, 2) + '****' + address.substring(6, address.length)
  }
};