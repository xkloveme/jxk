import { getValueType } from '../../utils/common';
/**
 * 判断是否是Symbol值
 * @author xkloveme <xkloveme@gmail.com>
 * @category is
 * @alias is_symbol
 * @param {any} value 任意值
 * @returns {Boolean} 返回是否是Symbol值
 */
export default (value) => {
  return getValueType(value) === '[object Symbol]';
};
