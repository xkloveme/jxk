/**
 * 延迟函数
 * @author xkloveme <xkloveme@gmail.com>
 * @category misc
 * @alias misc_delay
 * @param {Number} wait 等待时间
 * @returns {Promise} 返回延迟后的Promise
 */
export default (wait) => {
    return new Promise((resolve) => {
        setTimeout(resolve, wait);
    });
};
