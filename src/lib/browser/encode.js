/**
 * HTML 标签转义
 * 
 * @alias browser_encode
 * @category browser
 * 
 * @param {string} html - 要转义的 HTML 字符串
 * 
 * @returns {string} - 转义后的 HTML 实体字符串
 * 
 * @author xkloveme <xkloveme@gmail.com>
 * 
 * @example
 * browser_encode('<p>Hello</p>'); // 返回 "&lt;p&gt;Hello&lt;/p&gt;"
 */
export const browser_encode = (html) => {
  // 参数验证
  if (typeof html !== 'string') {
    throw new TypeError('The input must be a string.');
  }

  // 转义 HTML 实体
  const entities = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&#39;'
  };

  return html.replace(/[&<>"']/g, (match) => entities[match]);
};