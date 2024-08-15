/**
 * 数组（对象）深度克隆
 * 
 * @category  misc
 * @alias misc_deepClone
 * 
 * @param {*} obj - 待克隆的对象
 * 
 * @returns {*} - 克隆后的对象
 * 
 * @example
 * misc_deepClone({ a: 1, b: { c: 2 } });
 * // 返回 { a: 1, b: { c: 2 } }
 * 
 * @author xkloveme <xkloveme@gmail.com>
 * @Date 2024-08-10 21:59:39
 */
export default function misc_deepClone (obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj);
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => misc_deepClone(item));
  }

  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = misc_deepClone(obj[key]);
    return acc;
  }, Object.create(Object.getPrototypeOf(obj)));
}