import { getValueType } from '../../utils/common';
/**
 * 判断是否是WeakMap值
 * @author xkloveme <xkloveme@gmail.com>
 * @category is
 * @alias is_weakMap
 * @param {any} value 任意值
 * @returns {Boolean} 返回是否是WeakMap值
 */
export default (value) => {
  return getValueType(value) === '[object WeakMap]';
};
