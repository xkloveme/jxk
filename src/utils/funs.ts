import { FUNC } from './types';

/**
 * 防抖函数
 * @param {FUNC} fn 回调函数
 * @param {number} wait 等待时间
 * @param {boolean} immediate 第一次是否不等待立即执行
 * @returns {FUNC}
 */
export function debounce(
  fn: FUNC,
  wait: number,
  immediate: boolean = false,
): FUNC {
  let timer: any;
  return function (this: any, ...args: any) {
    if (timer) clearTimeout(timer);

    if (immediate && !timer) {
      fn.apply(this, args);
    }

    timer = setTimeout(() => {
      return fn.apply(this, args);
    }, wait);
  };
}

/**
 * 节流函数
 * @param {FUNC} fn 回调函数
 * @param {number} wait 等待时间
 * @returns {FUNC}
 */

export function throttle(fn: FUNC, wait: number): FUNC {
  let timer: any;
  return function (this: any, ...args: any) {
    if (!timer) {
      timer = setTimeout(() => {
        if (timer) clearTimeout(timer);
        fn.apply(this, args);
      }, wait);
    }
  };
}
