import { getValueType } from '../../utils/common';
/**
 * 判断是否是WeakSet值
 * @author xkloveme <xkloveme@gmail.com>
 * @category is
 * @alias is_weakSet
 * @param {any} value 任意值
 * @returns {Boolean} 返回是否是WeakSet值
 */
export default (value) => {
    return getValueType(value) === '[object WeakSet]';
};
