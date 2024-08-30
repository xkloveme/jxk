import isNumber from '../is/number.js';

/**
 * @alias array_max
 * @category array
 * @param {Array} array - 输入的数组。
 * @returns {number} - 数组中的最大值。
 * @throws {Error} - 如果输入不是数组。
 * @author xkloveme <xkloveme@gmail.com>
 * @example
 * console.log(array_max([1, 2, 3, 4, 5]))
 * // 输出: 5
 * @description 计算数组中的最大值
 */
export default (array) => {
  if (!Array.isArray(array)) {
    throw new Error('输入必须是一个数组');
  }

  if (array.length === 0) {
    return -Infinity;
  }

  const newArr = array.map((i) => {
    if (typeof i === 'string') {
      const num = Number(i);
      if (isNaN(num)) {
        return NaN;
      }
      return num;
    }
    if (!isNumber(i)) {
      return NaN;
    }
    return i;
  });

  if (newArr.some(isNaN)) {
    return NaN;
  }

  return Math.max(...newArr);
};