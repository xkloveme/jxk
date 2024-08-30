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
 * mask_address('四川省成都市高新区三墩街道某某小区31栋123号') // 四川省成都市高新区**街****区**栋***号
 */
export default (address) => {
  if (!address) return ''
  const regexp = /.+?(区|镇|乡|街|路|号|弄|座|幢|栋|单元|楼|层|室)/g
  const addArr = address.match(regexp)
  const province = addArr.shift()
  const encrypt = addArr.map(item => '*'.repeat(item.length - 1) + item.slice(-1)).join('')
  return province + encrypt
};