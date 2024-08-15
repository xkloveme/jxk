import { getValueType } from '../../utils/common';
/**
 * 判断是否是正则表达式
 * @author xkloveme <xkloveme@gmail.com>
 * @category is
 * @alias is_regexp
 * @param {any} value 任意值
 * @returns {Boolean} 返回是否是正则表达式
 */
export default (value) => {
  return getValueType(value) === '[object RegExp]';
};
