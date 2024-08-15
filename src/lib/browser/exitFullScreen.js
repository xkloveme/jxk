/**
 * 退出网页全屏
 * 
 * @alias browser_exitFullScreen
 * @category browser
 * 
 * @author xkloveme <xkloveme@gmail.com>
 * 
 * @example
 * browser_exitFullScreen();
 */
export default function browser_exitFullScreen() {
  // 兼容性处理
  const exitFullscreen = document.exitFullscreen ||
                         document.msExitFullscreen ||
                         document.mozCancelFullScreen ||
                         document.webkitExitFullscreen;

  if (exitFullscreen) {
    exitFullscreen.call(document);
  } else {
    throw new Error('Fullscreen is not supported by this browser.');
  }
}