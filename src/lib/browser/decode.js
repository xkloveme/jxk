/**
 * HTML 标签反转义
 * 
 * @alias browser_decode
 * @category browser
 * 
 * @param {string} text - 要反转义的 HTML 字符串
 * 
 * @returns {string} - 反转义后的纯文本
 * 
 * @author xkloveme <xkloveme@gmail.com>
 * 
 * @example
 * browser_decode('&lt;p&gt;Hello&lt;/p&gt;'); // 返回 "Hello"
 */
export default (text) => {
  // 参数验证
  if (typeof text !== 'string') {
    throw new TypeError('The input must be a string.');
  }

  if (typeof window === 'undefined') {
    throw new Error('Window object does not exist, this method can only be used in the browser.');
  }

  // 创建临时元素
  let temp = document.createElement('div');

  // 设置 innerHTML
  temp.innerHTML = text;

  // 获取纯文本
  const output = temp.innerText || temp.textContent;

  // 清理临时元素
  temp.remove();
  temp = null;

  return output;
};