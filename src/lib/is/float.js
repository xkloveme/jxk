/**
 * 判断是否是浮点数
 * @alias is_float
 * @category is
 * @param {any} value 任意值
 * @returns {boolean} 返回是否是整数
 * @author xkloveme xkloveme@gmail.com
 * @example
 * is_float(5.123) // false
 * is_float(5.0) // false
 * is_float(5) // false
 */
export default (value) => {
    return typeof value === 'number' && value % 1 !== 0;
};
