/**
 * 火车车次正则
 * @author xkloveme xkloveme@gmail.com
 * @category reg
 * @alias reg_regexp
 * @returns {RegExp} 返回火车车次正则
 * @summary /^[GCDZTSPKXLY1-9]\d{1,4}$/
 */
export default () => {
    return /^[GCDZTSPKXLY1-9]\d{1,4}$/;
};
