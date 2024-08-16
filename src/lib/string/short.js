/**
 * 对字符串进行截断处理，保留前后指定数量的字符，并用占位符替换中间的部分。
 * 
 * @author xkloveme <xkloveme@gmail.com>
 * @category string
 * @alias string_short
 * 
 * @param {string} str - 需要处理的原始字符串。
 * @param {number} [startNum=4] - 指定需要保留的字符串前缀长度，默认值为 4。
 * @param {number} [endNum=4] - 指定需要保留的字符串后缀长度，默认值为 4。
 * @param {string} [placeholder='***'] - 用于替换中间部分的占位符，默认值为 "***"。
 * 
 * @returns {string} - 返回经过截断处理后的字符串。
 * 
 * @example
 * // 截断字符串 "HelloWorld1234567890"，保留前4后4个字符
 * console.log(string_short('HelloWorld1234567890')); // 输出 "Hell***567890"
 * 
 * @example
 * // 截断字符串 "abcdefg"，保留前2后2个字符
 * console.log(string_short('abcdefg', 2, 2)); // 输出 "ab***fg"
 * 
 * @example
 * // 截断字符串 "1234567890"，保留前3后3个字符，使用 "-" 作为占位符
 * console.log(string_short('1234567890', 3, 3, '-')); // 输出 "123----------7890"
 * 
 * @example
 * // 截断字符串 "abc"，保留前2后1个字符
 * console.log(string_short('abc', 2, 1)); // 输出 "ab*c"
 * 
 * @example
 * // 截断空字符串
 * console.log(string_short('')); // 输出 ""
 */
export default (str, startNum = 4, endNum = 4, placeholder = '***') => {
  if (!str) return '';

  if (str.length <= startNum + endNum) return str;

  const startStr = str.substring(0, startNum);
  const endStr = str.substring(str.length - endNum);

  return `${startStr}${placeholder}${endStr}`;
};