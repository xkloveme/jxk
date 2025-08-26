import capitalize from './capitalize.js';

const kebab = (str) => {
  const parts =
    str
      ?.replace(/([A-Z])+/g, capitalize)
      ?.split(/(?=[A-Z])|[.\-\s_]/)
      .map((x) => x.toLowerCase()) ?? [];
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0];
  return parts.reduce((acc, part) => {
    return `${acc}-${part.toLowerCase()}`;
  });
};

/**
 * 字符串转换为短横线命名（kebab-case）风格
 * 
 * @description 将驼峰命名、下划线命名等风格的字符串转换为短横线命名风格。
 *              支持处理复杂的字符串格式，包括大小写混合、特殊分隔符等。
 *              常用于 CSS 类名、HTML 属性名等场景。
 * 
 * @category string
 * @alias string_kebabCase
 * @author xkloveme <xkloveme@gmail.com>
 * @since 0.1.0
 * 
 * @param {String} value - 需要转换的字符串
 * @param {String} [delimiter='/'] - 用于分割路径的分隔符，默认为 '/'
 * 
 * @returns {String} 转换后的短横线风格字符串
 * 
 * @throws {TypeError} 当输入不是字符串类型时抛出错误
 * 
 * @example
 * // 基本用法
 * kebabCase('helloWorld')
 * // => 'hello-world'
 * 
 * @example
 * // 处理下划线命名
 * kebabCase('hello_world_test')
 * // => 'hello-world-test'
 * 
 * @example
 * // 处理混合格式
 * kebabCase('HelloWorldTest')
 * // => 'hello-world-test'
 * 
 * @example
 * // 处理带分隔符的路径
 * kebabCase('user/profileInfo', '/')
 * // => 'user/profile-info'
 * 
 * @example
 * // 处理空值和边界情况
 * kebabCase('')           // => ''
 * kebabCase(null)         // => null
 * kebabCase(undefined)    // => undefined
 */
export default (value, delimiter = '/') => {
  if (value === undefined || value === null || value === '') return value;
  const data = value
    .split(delimiter)
    .map((v) => kebab(v))
    .join(delimiter);
  return data;
};
