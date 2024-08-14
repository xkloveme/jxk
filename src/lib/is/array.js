import {getValueType} from '../../utils/common';

/**
 * 是否是数组
 * @alias is_array
 * @category is
 * @param {any} value 任意值
 * @returns {boolean} 返回是否是数组
 * @author xkloveme xkloveme@gmail.com
 * @example is_array([1,2,3]) // true
 */
export default function is_array(value) {
  return Array.isArray(value) || getValueType(value) === '[object Array]';
}