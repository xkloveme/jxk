/**
 * 判断是否是整数
 * @author xkloveme <xkloveme@gmail.com>
 * @category is
 * @alias is_integer
 * @param {any} value 任意值
 * @returns {Boolean} 返回是否是整数
 */
export default (value) => {
  return Number.isInteger(value) && value.toString().indexOf('.') === -1;
};
