/**
 * html 标签转义
* @category browser
 * @param {string} html 要转义的 html
 * @alias browser_encode
 * @param {*} html
 * @returns
 * @author xkloveme xkloveme@gmail.com
 */
export const encode = (html) => {
  if (typeof window === 'undefined') {
    throw new Error('Window 对象不存在，此方法只能在浏览器端使用');
  }
  let temp;
  temp = window.document.createElement('div');
  temp.textContent ? (temp.textContent = html) : (temp.innerText = html);
  const output = temp.innerHTML;
  temp = null;
  return output;
};