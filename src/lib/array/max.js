import isNumber from '../is/number.js';
/**
 * @alias array_max
 * @category array
 * @param {Array} array - 输入的数组。
 * @returns {number} - 数组中的最大值。
 * @author xkloveme <xkloveme@gmail.com>
 * @example
 * console.log(array_max([1, 2, 3, 4, 5]))
 * // 输出: 5
 * @description 计算数组中的最大值。
 */
export default (array) => {
  const newArr = array.map((i) => {
    if (!isNumber(i)) {
      throw new Error('数组元素必须是数字型或数字型字符串');
    }
    return Number(i);
  });
  return Math.max.apply(null, newArr);
};
