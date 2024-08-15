/**
 * 将字符串、画布元素、图像元素、`Blob` 或 `File`、`ArrayBuffer` 或类型化数组、对象（转为 JSON 字符串）等下载为文件。
* @category misc
 * @alias misc_download
 * @param {HTMLCanvasElement | HTMLMediaElement | HTMLImageElement | HTMLSourceElement | HTMLTrackElement | HTMLEmbedElement | HTMLObjectElement | File | Blob | ArrayBuffer | URL | string} content - 下载内容/下载链接。
 * @param {string} [filename=document.title] - 文件名，默认使用页面标题。
 * @param {boolean} [isURL=false] - 传入的字符串是否为下载链接。（否则将作为文本内容下载）默认为 `false`。
 * @author xkloveme <xkloveme@gmail.com>
 */
export default function downloadContent (content, filename = document.title, isURL = false) {
  if (content === void 0 || content === null) {
    throw new TypeError('无下载内容！');
  }

  const anchor = document.createElement('a');

  // 将数值类型与布尔类型转为字符串
  if (typeof content === 'number' || typeof content === 'bigint' || typeof content === 'boolean') {
    return downloadContent(String(content), filename, isURL);
  }

  if (typeof content === 'string') {
    if (isURL) {
      anchor.href = content;
    } else {
      // 下载为文本内容
      return downloadContent(new Blob([content]), filename, isURL);
    }
  } else if (content instanceof HTMLCanvasElement) {
    anchor.href = content.toDataURL('image/png');
  } else if (content instanceof HTMLImageElement || content instanceof HTMLMediaElement || content instanceof HTMLSourceElement || content instanceof HTMLTrackElement || content instanceof HTMLEmbedElement) {
    anchor.href = content.src;
  } else if (content instanceof HTMLObjectElement) {
    anchor.href = content.data;
  } else if (content instanceof Blob) {
    anchor.href = URL.createObjectURL(content);
  } else if (content instanceof ArrayBuffer) {
    return downloadContent(new Blob([content]), filename, isURL);
  } else if (content instanceof URL) {
    anchor.href = content.href;
  } else if (ArrayBuffer.isView(content)) {
    return downloadContent(content.buffer, filename, isURL);
  } else if (typeof content === 'object') {
    try {
      // 尝试转为 JSON 字符串
      return downloadContent(new Blob([JSON.stringify(content)]), filename, isURL);
    } catch (error) {
      throw new TypeError('对象可能包含循环引用。');
    }
  } else {
    throw new TypeError('无法处理的类型');
  }

  // 设置文件名
  anchor.download = filename;

  // 触发下载
  anchor.click();

  // 清理：撤销创建的对象 URL
  if (content instanceof Blob) {
    URL.revokeObjectURL(anchor.href);
  }
}
