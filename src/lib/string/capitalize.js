/**
 * 字符串首字母大写
 * @author xkloveme <xkloveme@gmail.com>
 * @category string
 * @alias string_capitalize
 * @param {String} value 字符串数据
 * @param {String} delimiter 分隔符
 * @returns {String} 返回首字母大写的字符串
 */
export default (str) => {
  if (!str || str.length === 0) return '';
  const lower = str.toLowerCase();
  return lower.substring(0, 1).toUpperCase() + lower.substring(1, lower.length);
};
