/**
 * 函数节流 - 限制函数在指定时间间隔内最多只能执行一次
 * 
 * 节流技术常用于：
 * - 滚动事件：限制滚动监听器的执行频率
 * - 鼠标移动：减少鼠标移动事件的处理次数
 * - 窗口resize：控制窗口大小调整的响应频率
 * - API请求：防止用户频繁点击按钮导致的重复请求
 * - 游戏帧率控制：控制动画更新频率
 * 
 * @author tank
 * @category misc
 * @alias misc_throttle
 * @param {Function} fn - 需要节流的函数
 * @param {number} [interval=500] - 时间间隔（毫秒），默认 500ms
 * @returns {Function} 节流后的函数
 * @since 0.1.0
 * 
 * @example
 * // 基本用法：滚动事件节流
 * const throttledScroll = misc_throttle(() => {
 *   console.log('滚动位置：', window.scrollY);
 *   // 执行滚动相关逻辑，如懒加载、回到顶部按钮显示/隐藏等
 * }, 100); // 每 100ms 最多执行一次
 * 
 * window.addEventListener('scroll', throttledScroll);
 * 
 * @example
 * // 鼠标移动事件节流
 * const throttledMouseMove = misc_throttle((event) => {
 *   console.log('鼠标位置：', event.clientX, event.clientY);
 *   // 更新鼠标跟随效果、拖拽操作等
 * }, 50); // 每 50ms 最多执行一次，保证流畅性
 * 
 * document.addEventListener('mousemove', throttledMouseMove);
 * 
 * @example
 * // 窗口大小调整节流
 * const throttledResize = misc_throttle(() => {
 *   console.log('窗口大小：', window.innerWidth, window.innerHeight);
 *   // 重新计算布局、更新图表尺寸等
 * }, 250); // 每 250ms 最多执行一次
 * 
 * window.addEventListener('resize', throttledResize);
 * 
 * @example
 * // 按钮点击节流：防止用户快速重复点击
 * const saveButton = document.getElementById('save');
 * const throttledSave = misc_throttle(() => {
 *   console.log('正在保存...');
 *   // 执行保存逻辑
 *   saveData().then(() => {
 *     console.log('保存成功');
 *   });
 * }, 2000); // 2 秒内最多执行一次
 * 
 * saveButton.addEventListener('click', throttledSave);
 * 
 * @example
 * // API 请求节流
 * const throttledSearch = misc_throttle(async (query) => {
 *   if (!query.trim()) return;
 *   
 *   console.log('搜索：', query);
 *   try {
 *     const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
 *     const results = await response.json();
 *     displaySearchResults(results);
 *   } catch (error) {
 *     console.error('搜索失败：', error);
 *   }
 * }, 1000); // 每秒最多请求一次
 * 
 * searchInput.addEventListener('input', (e) => {
 *   throttledSearch(e.target.value);
 * });
 * 
 * @example
 * // 在游戏或动画中使用
 * const throttledGameUpdate = misc_throttle(() => {
 *   // 更新游戏状态、渲染画面等
 *   updateGameState();
 *   renderGame();
 * }, 16); // 约60FPS，每 16.67ms 最多执行一次
 * 
 * function gameLoop() {
 *   throttledGameUpdate();
 *   requestAnimationFrame(gameLoop);
 * }
 * gameLoop();
 * 
 * @example
 * // 在 React/Vue 等框架中使用
 * import { misc_throttle } from 'jxk';
 * 
 * export default {
 *   data() {
 *     return {
 *       scrollPosition: 0,
 *       isScrolling: false
 *     };
 *   },
 *   mounted() {
 *     this.throttledScrollHandler = misc_throttle(this.handleScroll, 100);
 *     window.addEventListener('scroll', this.throttledScrollHandler);
 *   },
 *   beforeDestroy() {
 *     window.removeEventListener('scroll', this.throttledScrollHandler);
 *   },
 *   methods: {
 *     handleScroll() {
 *       this.scrollPosition = window.scrollY;
 *       this.isScrolling = true;
 *       
 *       // 滚动停止检测
 *       clearTimeout(this.scrollTimer);
 *       this.scrollTimer = setTimeout(() => {
 *         this.isScrolling = false;
 *       }, 150);
 *     }
 *   }
 * };
 * 
 * @note 节流函数会立即执行第一次调用，然后在指定时间间隔内忽略后续调用
 * @note 与防抖（debounce）不同，节流保证函数在指定时间间隔内至少执行一次
 * @note 节流函数不会返回值，如果需要返回值，请使用回调函数或 Promise
 */
export default (fn, interval) => {
  let inThrottle;
  interval = interval || 500;
  return function () {
    const args = arguments;
    const that = this;
    if (!inThrottle) {
      fn.apply(that, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), interval);
    }
  };
};
