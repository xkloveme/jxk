/**
 * 合并多个数组或单个元素到一个新的数组中。
 * 
 * @author xkloveme <xkloveme@gmail.com>
 * @category array
 * @alias array_concat
 * 
 * @param {...any} args - 一个或多个数组或单个元素。
 * 
 * @returns {Array} - 合并后的数组。
 * 
 * @example
 * // 合并两个数组
 * console.log(array_concat([1, 2], [3, 4])); // 输出 [1, 2, 3, 4]
 * 
 * @example
 * // 合并数组和单个元素
 * console.log(array_concat([1, 2], 3, [4, 5])); // 输出 [1, 2, 3, 4, 5]
 * 
 * @example
 * // 合并多个数组和单个元素
 * console.log(array_concat([1, 2], [3, 4], 5, [6, 7])); // 输出 [1, 2, 3, 4, 5, 6, 7]
 * 
 * @example
 * // 合并空数组
 * console.log(array_concat([], [])); // 输出 []
 * 
 * @example
 * // 合并单个元素
 * console.log(array_concat(1, 2, 3)); // 输出 [1, 2, 3]
 * 
 * @example
 * // 合并不同类型的元素
 * console.log(array_concat([1, 2], 'text', [3, 4])); // 输出 [1, 2, 'text', 3, 4]
 */
export default (...args) => {
    // 使用 Array.prototype.concat.apply 来合并所有传入的参数
    return [].concat(...args.map(arg => Array.isArray(arg) ? arg : [arg]));
};