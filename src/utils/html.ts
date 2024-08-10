import { FUNC, OBJ } from './types';

/**
 * html 标签转义
 * @param {*} html
 * @returns
 */
export const encode = (html: string): string => {
  if (typeof window === 'undefined') {
    throw new Error('Window 对象不存在，此方法只能在浏览器端使用');
  }
  let temp: any;
  temp = window.document.createElement('div');
  temp.textContent ? (temp.textContent = html) : (temp.innerText = html);
  const output: string = temp.innerHTML;
  temp = null;
  return output;
};

/**
 * html 标签反转义
 * @param {*} text
 * @returns
 */
export const decode = (text: string): string => {
  if (typeof window === 'undefined') {
    throw new Error('Window 对象不存在，此方法只能在浏览器端使用');
  }
  let temp: any;
  temp = window.document.createElement('div');
  temp.innerHTML = text;
  const output: string = temp.innerText || temp.textContent;
  temp = null;
  return output;
};

/**
 * 懒加载（无限上拉加载）
 * @param {FUNC} fn 回调方法
 * @param {Element} signId
 * @param {Element} containId
 * @returns {OBJ}
 */
export const lazyLoading = (
  fn: FUNC,
  signId: Element,
  containId: Element,
): OBJ => {
  const io = new IntersectionObserver(
    (e) => {
      if (e[0].isIntersecting) fn();
    },
    {
      root: containId,
      threshold: [0.9],
    },
  );

  const attrs: OBJ = {
    /**
     * 开始观察
     */
    observe: (): void => {
      io.observe(signId);
    },
    /**
     * 停止观察
     */
    unobserve: (): void => {
      io.unobserve(signId);
    },
    /**
     * 关闭观察器
     */
    disconnect: (): void => {
      io.disconnect();
    },
  };

  // attrs.observe();

  return attrs;
};
