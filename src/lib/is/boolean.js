import { getValueType } from '../../utils/common';
/**
 * 判断是否是布尔值
 * @author xkloveme <xkloveme@gmail.com>
 * @category is
 * @alias is_boolean
 * @param {any} value 任意值
 * @returns {Boolean} 返回是否是布尔值
 */
export default (value) => {
  return value === true || value === false || getValueType(value) === '[object Boolean]';
};
