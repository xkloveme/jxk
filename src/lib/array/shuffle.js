/**
 * 数组随机排序（俗称洗牌）
 * 
 * @description 使用 Fisher-Yates 洗牌算法的简化版本对数组进行随机排序。
 *              该方法虽然简单，但在某些 JavaScript 引擎中可能不是完全随机的。
 *              对于需要高质量随机性的场景，建议使用 durstenfeldShuffle 或 sattoloShuffle。
 * 
 * @category array
 * @alias array_shuffle
 * @author 生命过客 <739694218@qq.com>
 * @since 0.1.0
 * 
 * @param {Array} [array=[]] - 需要洗牌的数组，默认为空数组
 * 
 * @returns {Array} 返回随机排序后的新数组（不修改原数组）
 * 
 * @example
 * // 基本用法
 * const numbers = [1, 2, 3, 4, 5]
 * const shuffled = shuffle(numbers)
 * console.log(shuffled) // => [3, 1, 5, 2, 4] (随机结果)
 * console.log(numbers)  // => [1, 2, 3, 4, 5] (原数组未改变)
 * 
 * @example
 * // 处理字符串数组
 * const words = ['apple', 'banana', 'cherry', 'date']
 * const shuffledWords = shuffle(words)
 * // => ['cherry', 'apple', 'date', 'banana'] (随机结果)
 * 
 * @example
 * // 处理空数组
 * shuffle([]) // => []
 * 
 * @example
 * // 处理单元素数组
 * shuffle([42]) // => [42]
 * 
 * @see {@link durstenfeldShuffle} - 更高质量的洗牌算法
 * @see {@link sattoloShuffle} - Sattolo 洗牌算法
 */
export default (array = []) => {
    return array.sort(() => Math.random() - 0.5);
};
