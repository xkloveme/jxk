import isNumber from '../is/number.js';
/**
 * @alias array_min
 * @category array
 * @param {Array} array - 输入的数组。
 * @returns {number} - 数组中的最小值。
 * @author xkloveme <xkloveme@gmail.com>
 * @example
 * console.log(array_min([1, 2, 3, 4, 5]))
 * // 输出: 1
 * @description 计算数组中的最小值
 */
export default (array) => {
  const newArr = array.map((i) => {
    if (!isNumber(i)) {
      throw new Error('数组元素必须是数字型或数字型字符串');
    }
    return Number(i);
  });

  return Math.min.apply(null, newArr);
};
