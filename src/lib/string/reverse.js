/**
 * @description 字符串反转
 * @category string
 * @alias string_reverse
 * @param {string} str - 要转换的字符串
 * @returns {string} - 返回结果
 * @summary 将提供的字符串按照反转输出
 * 
 * @example
 * // 反转空字符串
 * console.log(string_reverse('')); // 输出 ''
 * 
 * @example
 * // 反转 "hello"
 * console.log(string_reverse('hello')); // 输出 'olleh'
 * 
 * @example
 * // 反转 "world"
 * console.log(string_reverse('world')); // 输出 'dlrow'
 * 
 * @example
 * // 反转 "12345"
 * console.log(string_reverse('12345')); // 输出 '54321'
 * 
 * @example
 * // 反转 "你好世界"
 * console.log(string_reverse('你好世界')); // 输出 '界世好你'
 * 
 * @author xkloveme <xkloveme@gmail.com>
 * @Date 2024-08-16 17:34:38
 */
export default (str) => {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
};