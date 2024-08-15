/**
 * 判断是否是数字
 * @category is
 * @alias is_number
 * @param {(string | number)} num
 * @returns {boolean}
 * @example
 * improt { is_number } from 'jxk'
 * is_number(123) // true
 * @author xkloveme <xkloveme@gmail.com>
 * @Date: 2024-08-10 21:53:59
 */
export default function is_number(num) {
  return new RegExp(/^-?([0-9]?|[1-9]\d+)(\.\d+)?$/).test(`${num}`);
}