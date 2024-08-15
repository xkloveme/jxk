/**
 * 开启网页全屏
 * 
 * @alias browser_openFullscreen
 * @category browser
 * 
 * @param {Element} element - 要进入全屏模式的 DOM 元素
 * 
 * @author xkloveme <xkloveme@gmail.com>
 * 
 * @example
 * const element = document.getElementById('myElement');
 * browser_openFullscreen(element);
 */
export default function browser_openFullscreen(element) {
  // 参数验证
  if (!(element instanceof Element)) {
    throw new TypeError('The argument must be an instance of Element.');
  }

  // 兼容性处理
  const requestFullscreen = element.requestFullscreen ||
                            element.mozRequestFullScreen ||
                            element.msRequestFullscreen ||
                            element.webkitRequestFullScreen;

  if (requestFullscreen) {
    requestFullscreen.call(element);
  } else {
    throw new Error('Fullscreen is not supported by this browser.');
  }
}