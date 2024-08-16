import capitalize from './capitalize.js';

/**
 * 将字符串转换为蛇形风格（snake_case）。
 * 
 * @author xkloveme <xkloveme@gmail.com>
 * @category string
 * @alias string_snakeCase
 * 
 * @param {string} str - 需要转换的原始字符串。
 * @param {boolean} [splitOnNumber=true] - 是否在字母和数字之间插入下划线，默认为 true。
 * 
 * @returns {string} - 返回转换后的蛇形风格字符串。
 * 
 * @example
 * // 转换 "CamelCase" 为 snake_case
 * console.log(string_snakeCase('CamelCase')); // 输出 "camel_case"
 * 
 * @example
 * // 转换 "ThisIsATest" 为 snake_case
 * console.log(string_snakeCase('ThisIsATest')); // 输出 "this_is_a_test"
 * 
 * @example
 * // 转换 "thisIsATest" 为 snake_case
 * console.log(string_snakeCase('thisIsATest')); // 输出 "this_is_a_test"
 * 
 * @example
 * // 转换 "thisIsATest123" 为 snake_case
 * console.log(string_snakeCase('thisIsATest123')); // 输出 "this_is_a_test_123"
 * 
 * @example
 * // 转换 "thisIsATest123" 为 snake_case，不在字母和数字之间插入下划线
 * console.log(string_snakeCase('thisIsATest123', false)); // 输出 "this_is_a_test123"
 * 
 * @example
 * // 转换 "ThisIsATest123" 为 snake_case
 * console.log(string_snakeCase('ThisIsATest123')); // 输出 "this_is_a_test_123"
 * 
 * @example
 * // 转换 "ThisIsATest123" 为 snake_case，不在字母和数字之间插入下划线
 * console.log(string_snakeCase('ThisIsATest123', false)); // 输出 "this_is_a_test123"
 * 
 * @example
 * // 转换 "ThisIsATest-123" 为 snake_case
 * console.log(string_snakeCase('ThisIsATest-123')); // 输出 "this_is_a_test_123"
 * 
 * @example
 * // 转换 "ThisIsATest-123" 为 snake_case，不在字母和数字之间插入下划线
 * console.log(string_snakeCase('ThisIsATest-123', false)); // 输出 "this_is_a_test-123"
 */
export default (str, splitOnNumber = true) => {
    if (!str) return '';

    // 使用 capitalize 函数处理每个大写字母
    const capitalizedParts = str.replace(/([A-Z])/g, capitalize);

    // 分割字符串，移除特殊字符并转换为小写
    const parts = capitalizedParts.split(/(?=[A-Z])|[.\-\s_]/).map(part => part.toLowerCase());

    // 组合为 snake_case
    const snakeCase = parts.join('_');

    // 在字母和数字之间插入下划线
    return splitOnNumber ? snakeCase.replace(/([a-z])([0-9])/g, '$1_$2') : snakeCase;
};