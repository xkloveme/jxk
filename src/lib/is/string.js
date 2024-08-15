/**
 * 判断是否是字符串
 * @author xkloveme <xkloveme@gmail.com>
 * @category is
 * @alias is_string
 * @param {any} value 任意值
 * @returns {Boolean} 返回是否是字符串
 */
export default (value) => {
  return Object.prototype.toString.call(value) === '[object String]';
};
