import { SM3 } from "../../utils/sm3";

/**
 * SM3 哈希算法实现
 * @module SM3
 */

/**
 * SM3 消息摘要算法
 * @param {string|Buffer} data - 需要计算哈希的数据
 * @param {Object} [options] - 哈希计算选项
 * @param {string} [options.encoding='hex'] - 输出编码格式
 * @returns {string} SM3 哈希值
 *
 * @category sm
 * @alias sm3
 * @author xkloveme <xkloveme@gmail.com>
 * @Date: 2024-08-10 21:53:59
 *
 * @example
 * // 示例用法
 * import {sm3} from "jxk";
 * const hash = sm3("Hello, World!");
 * console.log(hash); // 输出 SM3 哈希值
 */
export default function sm3(data, options) {
    return SM3(data, options)
}