
/**
 * cehis
 * @param {*} state
 * @returns {*}
 * @example 示例
 * @author xkloveme xkloveme@gmail.com
 * @Date 2024-08-10 21:59:39
 */
export default function sm4fn (state){
  const obj = {
    info: 'i',
    success: '√',
    warn: '‼',
    error: '×'
};

return obj[state];
}