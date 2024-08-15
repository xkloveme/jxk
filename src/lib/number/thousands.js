import number_parse from './parse.js';
import is_number from '../is/number.js';

/**
 * 格式化数字为千分位格式
 * 
 * @alias number_thousands
 * @category number
 * 
 * @param {number|string} number - 待格式化的数字
 * @param {Object|string} [options=" "] - 选项或分隔符
 * @param {string} [options.separator=","] - 千分位分隔符
 * @param {boolean} [options.formatFourDigits=true] - 是否格式化四位数
 * 
 * @returns {string} - 格式化后的字符串
 * 
 * @author xkloveme <xkloveme@gmail.com>
 * 
 * @example
 * number_thousands(1234567); // 返回 "1,234,567"
 * number_thousands(1234567, { separator: '.' }); // 返回 "1.234.567"
 * number_thousands(1234567, { formatFourDigits: false }); // 返回 "12,345,67"
 * number_thousands(1234567, { separator: '.', formatFourDigits: false }); // 返回 "12.345.67"
 * number_thousands(1234567, '.'); // 返回 "1.234.567"
 */
export default function number_thousands(number, options) {
  // 参数验证
  if (is_number(number)) {
    throw new Error('The first argument must be a valid number.');
  }

  // 解析数字
  const numberObject = number_parse(number);
  const numberString = String(number);

  // 解析 options
  let separator = ',';
  let formatFourDigits = true;

  if (typeof options === 'object') {
    if (options.separator) {
      separator = options.separator;
    }

    if (typeof options.formatFourDigits === 'boolean') {
      formatFourDigits = options.formatFourDigits;
    }
  } else if (typeof options === 'string') {
    separator = options;
  }

  // 格式化逻辑
  if (numberObject.integer.length <= 3 || (numberObject.integer.length === 4 && !formatFourDigits)) {
    return numberString;
  }

  const formattedInteger = numberObject.integer.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  let result = numberObject.sign + formattedInteger;

  if (numberObject.fraction) {
    result += '.' + numberObject.fraction;
  }

  return result;
}