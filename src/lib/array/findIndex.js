/**
 * 查找数组中具有指定字段和值的对象的索引。
 * 
 * @author xkloveme <xkloveme@gmail.com>
 * @category array
 * @alias array_findIndex
 * 
 * @param {Array} array - 待搜索的数组。
 * @param {string} field - 要查找的字段名。
 * @param {*} value - 字段对应的值。
 * 
 * @returns {number | null} - 返回匹配对象的索引，如果没有找到则返回 null。
 * 
 * @example
 * // 查找具有 id 为 1 的对象的索引
 * console.log(array_findIndex([{id: 1}, {id: 2}], 'id', 1)); // 输出 0
 * 
 * @example
 * // 查找具有 name 为 'Alice' 的对象的索引
 * console.log(array_findIndex([{name: 'Alice'}, {name: 'Bob'}], 'name', 'Alice')); // 输出 0
 * 
 * @example
 * // 查找具有 age 为 30 的对象的索引
 * console.log(array_findIndex([{age: 25}, {age: 30}], 'age', 30)); // 输出 1
 * 
 * @example
 * // 查找不存在的对象的索引
 * console.log(array_findIndex([{age: 25}, {age: 30}], 'age', 40)); // 输出 null
 * 
 * @example
 * // 查找空数组中的对象的索引
 * console.log(array_findIndex([], 'age', 40)); // 输出 null
 */
export default (array, field, value) => {
  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    if (item[field] === value) {
      return index;
    }
  }
  return null;
};