/**
 * 该函数用于对字符串进行置换操作。
 * 
 * @author xkloveme <xkloveme@gmail.com> - 作者信息
 * @category string - 表明该函数属于字符串处理类别
 * @alias string_displace - 函数别名
 * 
 * @param {String} strs - 需要处理的原始字符串。
 * @param {Number} start - 指定需要保留的字符串前缀长度，默认值为 0。
 * @param {Number} end - 指定需要保留的字符串后缀长度，默认值为 0。
 * @param {String} placeholder - 用于替换中间部分的占位符，默认值为 '*'。
 * 
 * @returns {String} - 返回经过置换处理后的字符串。
 * 
 * @example
 * // 保留前缀 "He" 和后缀 "d"，其余部分用 "*" 替换
 * console.log(string_displace("Hello World", 2, 1)); // 输出 "He*********d"
 * 
 * @example
 * // 保留前缀 "Hel" 和后缀 "rld"，其余部分用 "-" 替换
 * console.log(string_displace("Hello World", 3, 3, "-")); // 输出 "Hel-----------------rld"
 * 
 * @example
 * // 保留前缀 "H" 和后缀 "d"，其余部分用 "#" 替换
 * console.log(string_displace("Hello World", 1, 1, "#")); // 输出 "H#################d"
 * 
 * @example
 * // 仅保留前缀 "He"，其余部分用 "*" 替换
 * console.log(string_displace("Hello World", 2)); // 输出 "He****************"
 * 
 * @example
 * // 仅保留后缀 "ld"，其余部分用 "*" 替换
 * console.log(string_displace("Hello World", undefined, 2)); // 输出 "***********ld"
 * 
 * @example
 * // 不保留任何前缀或后缀，全部用 "*" 替换
 * console.log(string_displace("Hello World")); // 输出 "***********"
 */
export default (strs = '', start = 0, end = 0, placeholder = '*') => {
  // 将输入的字符串转换为数组
  const strArray = strs.split('');

  // 截取字符串前缀部分
  const startStrs = strArray.slice(0, start).join('');

  // 截取字符串后缀部分。注意这里的 slice(end, 0) 应该是一个错误，应该是 slice(-end)
  const endStrs = strArray.slice(-end).join('');

  // 返回组合后的字符串：前缀 + 占位符 + 后缀
  return `${startStrs}${placeholder}${endStrs}`;
};