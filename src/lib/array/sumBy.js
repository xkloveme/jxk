/**
 * 数组求和
 * @author xkloveme <xkloveme@gmail.com>
 * @category array
 * @alias array_sumBy
 * @param {Array} arr 数组数据
 * @param {Function} iteratee 迭代函数
 * @returns {number} 返回求和值
 */
export default (arr, iteratee) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += iteratee(arr[i]);
    }
    return sum;
};
