/**
 * 函数防抖 - 在事件被触发后设定一个等待延迟时间，如果在延迟时间内事件被再次触发，则重新计算延迟时间
 * 
 * 防抖技术常用于：
 * - 搜索输入框：防止用户输入过程中频繁触发搜索请求
 * - 窗口resize事件：防止页面大小调整过程中频繁计算布局
 * - 按钮点击：防止用户意外的重复提交
 * - API请求：减少服务器负载
 * 
 * @author tank | dayDreamer-byte
 * @category misc
 * @alias misc_debounce
 * @param {Function} fn - 需要防抖的函数
 * @param {number} [delay=1000] - 防抖延迟时间（毫秒），默认 1000ms
 * @param {boolean} [firstExecute=false] - 是否在首次调用时立即执行函数
 * @returns {Function} 防抖后的函数
 * @since 0.1.0
 * 
 * @example
 * // 基本用法：搜索输入防抖
 * const searchInput = document.getElementById('search');
 * const debouncedSearch = misc_debounce((value) => {
 *   console.log('搜索：', value);
 *   // 执行搜索请求
 * }, 300);
 * 
 * searchInput.addEventListener('input', (e) => {
 *   debouncedSearch(e.target.value);
 * });
 * 
 * @example
 * // 窗口大小调整防抖
 * const debouncedResize = misc_debounce(() => {
 *   console.log('窗口大小已改变：', window.innerWidth, window.innerHeight);
 *   // 重新计算布局
 * }, 250);
 * 
 * window.addEventListener('resize', debouncedResize);
 * 
 * @example
 * // 首次立即执行模式：防止重复提交
 * const submitButton = document.getElementById('submit');
 * const debouncedSubmit = misc_debounce(() => {
 *   console.log('提交表单');
 *   // 执行提交逻辑
 * }, 2000, true); // 首次立即执行，然后 2 秒内忽略重复点击
 * 
 * submitButton.addEventListener('click', debouncedSubmit);
 * 
 * @example
 * // API 请求防抖
 * const debouncedApiCall = misc_debounce(async (userId) => {
 *   try {
 *     const response = await fetch(`/api/users/${userId}`);
 *     const userData = await response.json();
 *     console.log('用户数据：', userData);
 *   } catch (error) {
 *     console.error('获取用户数据失败：', error);
 *   }
 * }, 500);
 * 
 * // 用户快速切换时只会请求最后一个用户的数据
 * userSelector.addEventListener('change', (e) => {
 *   debouncedApiCall(e.target.value);
 * });
 * 
 * @example
 * // 在 React/Vue 等框架中使用
 * import { misc_debounce } from 'jxk';
 * 
 * export default {
 *   data() {
 *     return {
 *       searchQuery: '',
 *       searchResults: []
 *     };
 *   },
 *   created() {
 *     this.debouncedSearch = misc_debounce(this.performSearch, 400);
 *   },
 *   methods: {
 *     performSearch(query) {
 *       if (!query.trim()) {
 *         this.searchResults = [];
 *         return;
 *       }
 *       // 执行搜索逻辑
 *       this.searchAPI(query).then(results => {
 *         this.searchResults = results;
 *       });
 *     },
 *     onSearchInput(value) {
 *       this.searchQuery = value;
 *       this.debouncedSearch(value);
 *     }
 *   }
 * };
 * 
 * @note 防抖函数会记住最后一次调用的参数，在延迟时间结束后使用这些参数执行原函数
 * @note 如果需要取消防抖，可以将返回的函数赋值为 null 或使用 clearTimeout
 * @note firstExecute 参数只在首次调用时生效，后续调用仍遵循防抖规则
 */
export default (fn, delay = 1000, firstExecute = false) => {
    let timer = null; // 延迟执行器
    let isFuture = false; // 首次执行是否完成
    return function (...args) {
        if (firstExecute && !isFuture) {
            fn.apply(this, args);
            isFuture = true; // 首次执行完毕
        }
        timer && clearTimeout(timer);
        const _this = this;
        timer = setTimeout(() => {
            fn.apply(_this, args);
        }, delay);
    };
};
