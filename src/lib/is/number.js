/**
 * 判断是否是数字
 * @category is
 * @alias isNumber
 * @param {(string | number)} num
 * @returns {boolean}
 * @example 示例
 * @author xkloveme xkloveme@gmail.com
 * @Date: 2024-08-10 21:53:59
 */
export default function isNumber(num) {
  return new RegExp(/^-?([0-9]?|[1-9]\d+)(\.\d+)?$/).test(`${num}`);
}