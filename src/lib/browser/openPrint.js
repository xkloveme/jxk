/**
 * 在当前页面打开新窗口页,并打印
 * @author xkloveme xkloveme@gmail.com
 * @category browser
 * @alias browser_openPrint
 * @param {string} id 需要打印的 dom id
 */

export default (id) => {
  let newstr = id ? document.getElementById(id).innerHTML : document.body.innerHTML;
  var newWindow = window.open('', '_blank');
  newWindow.document.write(newstr);
  setTimeout(() => {
    newWindow.print();
  }, 1000);
}
