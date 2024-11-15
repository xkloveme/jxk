/**
 * 脱敏姓名
 * @author xkloveme <xkloveme@gmail.com>
 * @category  mask
 * @alias mask_name
 * @param {string}  name 脱敏姓名
 * @returns {String} 返回脱敏姓名
 * @example
 * improt { mask_name } from 'jxk'
 * mask_name('张三') // *三
 * mask_name('王小明') // *小明
 * mask_name('John') // *ohn
 */
export default (str) => {
  if (!str) return null
  return '*' + str.substring(1)
};