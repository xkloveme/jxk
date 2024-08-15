/**
 * 开启网页全屏
 * @author xkloveme xkloveme@gmail.com
 * @category browser
 * @alias browser_openFullscreen
 * @param {string} element 元素
 */
export default (element) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen();
  }
};
