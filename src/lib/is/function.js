import { getValueType } from '../../utils/common';
/**
 * 判断是否是函数
 * @author xkloveme <xkloveme@gmail.com>
 * @category is
 * @alias is_function
 * @param {any} value 任意值
 * @returns {Boolean} 返回是否是函数
 */
export default (value) => {
  const tag = getValueType(value);
  return tag === '[object Function]' || tag === '[object AsyncFunction]';
};
