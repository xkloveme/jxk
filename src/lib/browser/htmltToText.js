/**
 * 获取url参数
 * @author xkloveme <xkloveme@gmail.com>
 * @category browser
 * @alias browser_htmltToText
 * @description 该函数将HTML字符串转换为纯文本，去除所有HTML标签。
 * @summary 该函数适用于需要从HTML内容中提取纯文本的场景，例如在处理用户输入或从网页抓取数据时。
 * @example
 * const htmlString = '<div>Hello <strong>World</strong>!</div>';
 * const text = browser_htmltToText(htmlString);
 * console.log(text); // 输出: "Hello World!"
 * @param {string} htmlString 要转换的HTML字符串
 * @returns {string} 转换后的纯文本
 */

export default (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  return doc.body.textContent;
};
