/**
 * 查找数组中匹配的值
 * @author xkloveme <xkloveme@gmail.com>
 * @category array
 * @alias array_findObj
 * @param {Array} arrObj 数组对象
 * @param {string} field 要查找的属性
 * @param {Any} value 属性的值
 * @returns {object} 返回匹配的对象
 */
export default (arrObj, field, value) => {
    let result = {};
    for (const item of arrObj) {
        for (const prop in item) {
            if (Object.prototype.hasOwnProperty.call(item, prop)) {
                if (prop === field && item[prop] === value) {
                    result = item;
                    break;
                }
            }
        }
    }
    return result;
};
