import isNumber from '../is/number.js';

/**
 * @alias array_min
 * @category array
 * @param {Array} array - 输入的数组。
 * @returns {number} - 数组中的最小值。
 * @throws {Error} - 如果输入不是数组或数组为空。
 * @author xkloveme <xkloveme@gmail.com>
 * @example
 * console.log(array_min([1, 2, 3, 4, 5]))
 * // 输出: 1
 * @description 计算数组中的最小值
 */
export default (array) => {
  if (!Array.isArray(array)) {
    throw new Error('输入必须是一个数组');
  }

  if (array.length === 0) {
    return Infinity;
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

  return Math.min(...newArr);
};