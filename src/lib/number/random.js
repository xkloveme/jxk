import is_number from '../is/number.js';
import is_float from '../is/float.js';

/**
 * 获取2个数之间的随机数
 * 
 * @alias number_random
 * @category number
 * 
 * @param {number} lower - 最小值
 * @param {number} [upper] - 最大值
 * @param {boolean} [isFloat=false] - 是否浮点数
 * 
 * @returns {number} - 随机数
 * 
 * @author xkloveme <xkloveme@gmail.com>
 * 
 * @summary 产生一个包括 lower 与 upper 之间的数。
 * 如果只提供一个参数返回一个0到提供数之间的数。
 * 如果 isFloat 设为 true，或者 lower 或 upper 是浮点数，结果返回浮点数。
 */
export default function number_random(lower, upper, isFloat = false) {
  // 参数验证
  if (typeof lower !== 'number' || (is_number(lower) && is_number(upper))) {
    throw new TypeError('Both lower and upper must be numbers.');
  }

  // 处理单参数情况
  if (upper === undefined) {
    upper = lower;
    lower = 0;
  }

  // 判断是否返回浮点数
  const shouldReturnFloat = isFloat || is_float(lower) || is_float(upper);

  if (shouldReturnFloat) {
    return Math.random() * (upper - lower) + lower;
  } else {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
  }
}