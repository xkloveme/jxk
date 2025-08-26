import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import misc_debounce from './debounce.js';

describe('misc_debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('基础防抖功能', () => {
    it('应该延迟执行函数', () => {
      const mockFn = vi.fn();
      const debouncedFn = misc_debounce(mockFn, 1000);

      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1000);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('应该在延迟时间内重置计时器', () => {
      const mockFn = vi.fn();
      const debouncedFn = misc_debounce(mockFn, 1000);

      debouncedFn();
      vi.advanceTimersByTime(500);
      debouncedFn(); // 重新触发，重置计时器
      
      vi.advanceTimersByTime(500);
      expect(mockFn).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(500);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('应该使用默认延迟时间1000ms', () => {
      const mockFn = vi.fn();
      const debouncedFn = misc_debounce(mockFn);

      debouncedFn();
      vi.advanceTimersByTime(999);
      expect(mockFn).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(1);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('应该正确传递参数', () => {
      const mockFn = vi.fn();
      const debouncedFn = misc_debounce(mockFn, 1000);

      debouncedFn('arg1', 'arg2', 123);
      vi.advanceTimersByTime(1000);
      
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 123);
    });

    it('应该保持正确的this上下文', () => {
      const context = { value: 'test' };
      const mockFn = vi.fn(function() {
        return this.value;
      });
      const debouncedFn = misc_debounce(mockFn, 1000);

      debouncedFn.call(context);
      vi.advanceTimersByTime(1000);
      
      expect(mockFn).toHaveBeenCalledOnce();
    });
  });

  describe('首次执行功能', () => {
    it('当firstExecute为true时应该立即执行', () => {
      const mockFn = vi.fn();
      const debouncedFn = misc_debounce(mockFn, 1000, true);

      debouncedFn();
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      vi.advanceTimersByTime(1000);
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('当firstExecute为false时不应该立即执行', () => {
      const mockFn = vi.fn();
      const debouncedFn = misc_debounce(mockFn, 1000, false);

      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(1000);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('首次执行只应该在第一次调用时触发', () => {
      const mockFn = vi.fn();
      const debouncedFn = misc_debounce(mockFn, 1000, true);

      debouncedFn();
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      debouncedFn();
      expect(mockFn).toHaveBeenCalledTimes(1); // 第二次调用不应该立即执行
      
      vi.advanceTimersByTime(1000);
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('首次执行应该传递正确的参数', () => {
      const mockFn = vi.fn();
      const debouncedFn = misc_debounce(mockFn, 1000, true);

      debouncedFn('immediate', 'args');
      expect(mockFn).toHaveBeenCalledWith('immediate', 'args');
    });
  });

  describe('多次调用测试', () => {
    it('连续多次调用应该只执行最后一次', () => {
      const mockFn = vi.fn();
      const debouncedFn = misc_debounce(mockFn, 1000);

      debouncedFn('call1');
      debouncedFn('call2');
      debouncedFn('call3');
      
      vi.advanceTimersByTime(1000);
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('call3');
    });

    it('间隔时间超过延迟的多次调用应该都执行', () => {
      const mockFn = vi.fn();
      const debouncedFn = misc_debounce(mockFn, 1000);

      debouncedFn('call1');
      vi.advanceTimersByTime(1000);
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      debouncedFn('call2');
      vi.advanceTimersByTime(1000);
      expect(mockFn).toHaveBeenCalledTimes(2);
      
      expect(mockFn).toHaveBeenNthCalledWith(1, 'call1');
      expect(mockFn).toHaveBeenNthCalledWith(2, 'call2');
    });

    it('应该正确处理快速连续调用', () => {
      const mockFn = vi.fn();
      const debouncedFn = misc_debounce(mockFn, 1000);

      // 快速连续调用
      for (let i = 0; i < 10; i++) {
        debouncedFn(`call${i}`);
        vi.advanceTimersByTime(100);
      }
      
      expect(mockFn).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(1000);
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('call9');
    });
  });

  describe('不同延迟时间测试', () => {
    it('应该支持自定义延迟时间', () => {
      const mockFn = vi.fn();
      const debouncedFn = misc_debounce(mockFn, 500);

      debouncedFn();
      vi.advanceTimersByTime(499);
      expect(mockFn).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(1);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('应该支持0延迟', () => {
      const mockFn = vi.fn();
      const debouncedFn = misc_debounce(mockFn, 0);

      debouncedFn();
      vi.advanceTimersByTime(0);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('应该支持很长的延迟时间', () => {
      const mockFn = vi.fn();
      const debouncedFn = misc_debounce(mockFn, 10000);

      debouncedFn();
      vi.advanceTimersByTime(9999);
      expect(mockFn).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(1);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('错误处理测试', () => {
    it('应该处理函数执行中的错误', () => {
      const errorFn = vi.fn(() => {
        throw new Error('Test error');
      });
      const debouncedFn = misc_debounce(errorFn, 1000);

      debouncedFn();
      
      expect(() => {
        vi.advanceTimersByTime(1000);
      }).toThrow('Test error');
      
      expect(errorFn).toHaveBeenCalledTimes(1);
    });

    it('应该处理异步函数', () => {
      const asyncFn = vi.fn(async () => {
        return 'async result';
      });
      const debouncedFn = misc_debounce(asyncFn, 1000);

      debouncedFn();
      vi.advanceTimersByTime(1000);
      
      expect(asyncFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('内存管理测试', () => {
    it('应该正确清理定时器', () => {
      const mockFn = vi.fn();
      const debouncedFn = misc_debounce(mockFn, 1000);

      debouncedFn();
      debouncedFn(); // 应该清理第一个定时器
      
      // 检查只有一个定时器在运行
      expect(vi.getTimerCount()).toBe(1);
      
      vi.advanceTimersByTime(1000);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('执行后应该清理定时器', () => {
      const mockFn = vi.fn();
      const debouncedFn = misc_debounce(mockFn, 1000);

      debouncedFn();
      expect(vi.getTimerCount()).toBe(1);
      
      vi.advanceTimersByTime(1000);
      expect(vi.getTimerCount()).toBe(0);
    });
  });

  describe('实际使用场景测试', () => {
    it('搜索输入防抖', () => {
      const searchFn = vi.fn();
      const debouncedSearch = misc_debounce(searchFn, 300);

      // 模拟用户快速输入
      debouncedSearch('a');
      vi.advanceTimersByTime(100);
      debouncedSearch('ab');
      vi.advanceTimersByTime(100);
      debouncedSearch('abc');
      
      expect(searchFn).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(300);
      expect(searchFn).toHaveBeenCalledTimes(1);
      expect(searchFn).toHaveBeenCalledWith('abc');
    });

    it('窗口resize事件防抖', () => {
      const resizeHandler = vi.fn();
      const debouncedResize = misc_debounce(resizeHandler, 250);

      // 模拟连续resize事件
      for (let i = 0; i < 5; i++) {
        debouncedResize();
        vi.advanceTimersByTime(50);
      }
      
      expect(resizeHandler).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(250);
      expect(resizeHandler).toHaveBeenCalledTimes(1);
    });

    it('按钮点击防抖（立即执行模式）', () => {
      const submitFn = vi.fn();
      const debouncedSubmit = misc_debounce(submitFn, 1000, true);

      debouncedSubmit();
      expect(submitFn).toHaveBeenCalledTimes(1);
      
      // 快速重复点击应该被忽略
      debouncedSubmit();
      debouncedSubmit();
      expect(submitFn).toHaveBeenCalledTimes(1);
      
      vi.advanceTimersByTime(1000);
      expect(submitFn).toHaveBeenCalledTimes(2);
    });

    it('API请求防抖', () => {
      const apiCall = vi.fn();
      const debouncedApiCall = misc_debounce(apiCall, 500);

      // 模拟用户操作触发多个API请求
      debouncedApiCall('/api/data', { page: 1 });
      vi.advanceTimersByTime(200);
      debouncedApiCall('/api/data', { page: 2 });
      vi.advanceTimersByTime(200);
      debouncedApiCall('/api/data', { page: 3 });
      
      expect(apiCall).not.toHaveBeenCalled();
      
      vi.advanceTimersByTime(500);
      expect(apiCall).toHaveBeenCalledTimes(1);
      expect(apiCall).toHaveBeenCalledWith('/api/data', { page: 3 });
    });
  });

  describe('性能测试', () => {
    it('应该高效处理大量调用', () => {
      const mockFn = vi.fn();
      const debouncedFn = misc_debounce(mockFn, 1000);

      const start = performance.now();
      
      // 大量快速调用
      for (let i = 0; i < 10000; i++) {
        debouncedFn();
      }
      
      const end = performance.now();
      
      // 创建防抖函数应该很快
      expect(end - start).toBeLessThan(100);
      
      vi.advanceTimersByTime(1000);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('应该正确处理返回值', () => {
      const returnFn = vi.fn(() => 'test result');
      const debouncedFn = misc_debounce(returnFn, 1000);

      const result = debouncedFn();
      expect(result).toBeUndefined(); // 防抖函数本身不返回值
      
      vi.advanceTimersByTime(1000);
      expect(returnFn).toHaveBeenCalledTimes(1);
    });
  });
});