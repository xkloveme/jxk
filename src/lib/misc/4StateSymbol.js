/**
 * 状态方法
 * @category misc
 * @alias xxx
 * @param {*} state
 * @returns {*}
 * @example 
 * jxk_xxx('success') // '√'
 * @author xkloveme xkloveme@gmail.com
 * @Date 2024-08-10 23:18:14
 */
export default function xxx (state){
  const obj = {
    info: 'i',
    success: '√',
    warn: '‼',
    error: '×'
};

return obj[state];
}
