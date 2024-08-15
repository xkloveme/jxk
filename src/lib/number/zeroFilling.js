/**
 * 数字补0
 * 
 * @alias number_zeroFilling
 * @category number
 * 
 * @param {string|number} num - 原始数字
 * @param {number} len - 总位数（总长度）
 * @param {boolean} [check=true] - 是否检查数字的有效性
 * 
 * @returns {string} - 补0后的字符串
 * 
 * @author xkloveme <xkloveme@gmail.com>
 * 
 * @example
 * number_zeroFilling(123, 6); // 返回 "000123"
 * number_zeroFilling(123, 6, false); // 返回 "000123"
 * number_zeroFilling(123, 2); // 返回 "123"
 * number_zeroFilling(-123, 6); // 抛出错误 "输入参数必须是大于等于0的整数"
 */
export function number_zeroFilling(num, len, check = true) {
  // 参数验证
  if (typeof num !== 'number' && typeof num !== 'string') {
    throw new TypeError('The first argument must be a number or a string.');
  }

  if (typeof len !== 'number' || len < 0) {
    throw new TypeError('The second argument must be a non-negative number.');
  }

  if (check && !/^[0-9]*$/.test(num)) {
    throw new Error('输入参数必须是大于等于0的整数');
  }

  const numStr = String(num);
  const currLen = numStr.length;

  // 计算需要补0的数量
  const zerosNeeded = len - currLen;

  if (zerosNeeded > 0) {
    return '0'.repeat(zerosNeeded) + numStr;
  }

  return numStr;
}