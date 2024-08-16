/**
 * 移除字符串中的空白字符（包括空格、制表符、换页符等）。
 * 
 * @author xkloveme <xkloveme@gmail.com>
 * @category string
 * @alias string_trim
 * 
 * @param {string} str - 待处理的字符串。
 * @param {boolean} [trimAll=true] - 控制是否去除所有空白字符，默认为 false 只去除开头结尾。
 * 
 * @returns {string} - 返回处理后的字符串。
 * 
 * @example
 * // 去除普通空格
 * console.log(string_trim(' Hello World! ')); // 输出 "HelloWorld!"
 * 
 * @example
 * // 去除制表符
 * console.log(string_trim('\tTabbed\tText')); // 输出 "TabbedText"
 * 
 * @example
 * // 去除混合空白
 * console.log(string_trim(' New\nLine and spaces ')); // 输出 "NewLineandspaces"
 * 
 * @example
 * // 空字符串处理
 * console.log(string_trim('')); // 输出 ""
 * 
 * @example
 * // 无空白字符的字符串
 * console.log(string_trim('NoSpacesHere')); // 输出 "NoSpacesHere"
 * 
 * @example
 * // 只去除开头和结尾的空白字符
 * console.log(string_trim(' Hello World! ', false)); // 输出 "Hello World!"
 * 
 * @example
 * // 多个空格
 * console.log(string_trim('  Multiple   Spaces  ')); // 输出 "MultipleSpaces"
 * 
 * @example
 * // 只去除开头和结尾的空白字符，多个空格
 * console.log(string_trim('  Multiple   Spaces  ', false)); // 输出 "Multiple   Spaces"
 */
export default (str, trimAll = false) => {
  if (trimAll) {
    return str.replace(/\s+/g, '');
  } else {
    return str.trim();
  }
};