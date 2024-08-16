/**
 * 查找数组中具有指定字段和值的对象。
 * 
 * @author xkloveme <xkloveme@gmail.com>
 * @category array
 * @alias array_findObj
 * 
 * @param {Array} arrObj - 待搜索的数组。
 * @param {string} field - 要查找的字段名。
 * @param {*} value - 字段对应的值。
 * 
 * @returns {object} - 返回匹配的对象，如果没有找到则返回空对象。
 * 
 * @example
 * // 查找具有 id 为 1 的对象
 * console.log(array_findObj([{id: 1}, {id: 2}], 'id', 1)); // 输出 {id: 1}
 * 
 * @example
 * // 查找具有 name 为 'Alice' 的对象
 * console.log(array_findObj([{name: 'Alice'}, {name: 'Bob'}], 'name', 'Alice')); // 输出 {name: 'Alice'}
 * 
 * @example
 * // 查找具有 age 为 30 的对象
 * console.log(array_findObj([{age: 25}, {age: 30}], 'age', 30)); // 输出 {age: 30}
 * 
 * @example
 * // 查找不存在的对象
 * console.log(array_findObj([{age: 25}, {age: 30}], 'age', 40)); // 输出 {}
 * 
 * @example
 * // 查找空数组中的对象
 * console.log(array_findObj([], 'age', 40)); // 输出 {}
 */
export default (arrObj, field, value) => {
  for (const item of arrObj) {
    if (item[field] === value) {
      return item;
    }
  }
  return {};
};