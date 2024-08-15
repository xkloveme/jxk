/**
 * 判断是否是Object值
 * @alias is_object
 * @category is
 * @param {any} value 任意值
 * @returns {boolean} 返回是否是Object值
 * @author xkloveme <xkloveme@gmail.com>
 * @example is_object({}) // true
 */
export default (value) => {
    return value !== null && typeof value === 'object' && Object.prototype.toString.call(value) === '[object Object]';
};
