/**
 * html 标签反转义
 * @category browser
 * @param {*} text 要反转义的 html
 * @alias browser_decode
 * @returns
 * @author xkloveme xkloveme@gmail.com
 */
export const decode = (text) => {
  if (typeof window === 'undefined') {
    throw new Error('Window 对象不存在，此方法只能在浏览器端使用');
  }
  let temp;
  temp = window.document.createElement('div');
  temp.innerHTML = text;
  const output = temp.innerText || temp.textContent;
  temp = null;
  return output;
};