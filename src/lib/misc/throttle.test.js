import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import misc_throttle from './throttle.js';

describe('misc_throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  describe('基础节流功能', () => {
    it('应该立即执行第一次调用', () => {
      const mockFn = vi.fn();
      const throttledFn = misc_throttle(mockFn, 1000);

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('应该在节流期间忽略后续调用', () => {
      const mockFn = vi.fn();
      const throttledFn = misc_throttle(mockFn, 1000);

      throttledFn();
      throttledFn();
      throttledFn();
      
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('应该在节流时间结束后允许新的调用', () => {
      const mockFn = vi.fn();
      const throttledFn = misc_throttle(mockFn, 1000);

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      vi.advanceTimersByTime(1000);
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('应该使用默认间隔时间500ms', () => {
      const mockFn = vi.fn();
      const throttledFn = misc_throttle(mockFn);

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      vi.advanceTimersByTime(500);
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('应该正确传递参数', () => {
      const mockFn = vi.fn();
      const throttledFn = misc_throttle(mockFn, 1000);

      throttledFn('arg1', 'arg2', 123);
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 123);
    });

    it('应该保持正确的this上下文', () => {
      const context = { value: 'test' };
      let capturedThis;
      const mockFn = vi.fn(function() {
        capturedThis = this;
      });
      const throttledFn = misc_throttle(mockFn, 1000);

      throttledFn.call(context);
      expect(capturedThis).toBe(context);
    });
  });

  describe('不同间隔时间测试', () => {
    it('应该支持自定义间隔时间', () => {
      const mockFn = vi.fn();
      const throttledFn = misc_throttle(mockFn, 200);

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      vi.advanceTimersByTime(199);
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      vi.advanceTimersByTime(1);
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('应该支持0间隔时间', () => {
      const mockFn = vi.fn();
      const throttledFn = misc_throttle(mockFn, 0);

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      vi.advanceTimersByTime(0);
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('应该支持很长的间隔时间', () => {
      const mockFn = vi.fn();
      const throttledFn = misc_throttle(mockFn, 5000);

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      vi.advanceTimersByTime(4999);
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      vi.advanceTimersByTime(1);
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });

  describe('参数处理测试', () => {
    it('应该处理多个参数', () => {
      const mockFn = vi.fn();
      const throttledFn = misc_throttle(mockFn, 1000);

      throttledFn('a', 'b', 'c', 1, 2, 3);
      expect(mockFn).toHaveBeenCalledWith('a', 'b', 'c', 1, 2, 3);
    });

    it('应该处理不同类型的参数', () => {
      const mockFn = vi.fn();
      const throttledFn = misc_throttle(mockFn, 1000);

      const obj = { key: 'value' };
      const arr = [1, 2, 3];
      const fn = () => {};
      
      throttledFn(obj, arr, fn, null, undefined, true, false);
      expect(mockFn).toHaveBeenCalledWith(obj, arr, fn, null, undefined, true, false);
    });

    it('应该处理没有参数的调用', () => {
      const mockFn = vi.fn();
      const throttledFn = misc_throttle(mockFn, 1000);

      throttledFn();
      expect(mockFn).toHaveBeenCalledWith();
    });

    it('节流期间的参数变化应该被忽略', () => {
      const mockFn = vi.fn();
      const throttledFn = misc_throttle(mockFn, 1000);

      throttledFn('first');
      throttledFn('second');
      throttledFn('third');
      
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('first');
    });
  });

  describe('时间控制测试', () => {
    it('应该精确控制节流时间', () => {
      const mockFn = vi.fn();
      const throttledFn = misc_throttle(mockFn, 1000);

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      // 在节流期间的多次调用
      for (let i = 1; i <= 10; i++) {
        vi.advanceTimersByTime(100);
        throttledFn();
      }
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      // 节流时间结束后的调用
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('应该处理快速连续调用', () => {
      const mockFn = vi.fn();
      const throttledFn = misc_throttle(mockFn, 100);

      const callCount = 1000;
      for (let i = 0; i < callCount; i++) {
        throttledFn();
      }
      
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      vi.advanceTimersByTime(100);
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('应该正确处理周期性调用', () => {
      const mockFn = vi.fn();
      const throttledFn = misc_throttle(mockFn, 1000);

      // 每500ms调用一次，应该每1000ms执行一次
      for (let i = 0; i < 10; i++) {
        throttledFn(`call-${i}`);
        vi.advanceTimersByTime(500);
      }
      
      // 应该执行了5次（0ms, 1000ms, 2000ms, 3000ms, 4000ms）
      expect(mockFn).toHaveBeenCalledTimes(5);
    });
  });

  describe('多个实例测试', () => {
    it('不同的节流函数应该独立工作', () => {
      const mockFn1 = vi.fn();
      const mockFn2 = vi.fn();
      const throttledFn1 = misc_throttle(mockFn1, 1000);
      const throttledFn2 = misc_throttle(mockFn2, 500);

      throttledFn1();
      throttledFn2();
      
      expect(mockFn1).toHaveBeenCalledTimes(1);
      expect(mockFn2).toHaveBeenCalledTimes(1);
      
      vi.advanceTimersByTime(500);
      throttledFn1();
      throttledFn2();
      
      expect(mockFn1).toHaveBeenCalledTimes(1); // 还在节流期
      expect(mockFn2).toHaveBeenCalledTimes(2); // 节流期结束
    });

    it('同一函数的多个节流实例应该独立', () => {
      const mockFn = vi.fn();
      const throttledFn1 = misc_throttle(mockFn, 1000);
      const throttledFn2 = misc_throttle(mockFn, 1000);

      throttledFn1();
      throttledFn2();
      
      expect(mockFn).toHaveBeenCalledTimes(2);
      
      throttledFn1();
      throttledFn2();
      
      expect(mockFn).toHaveBeenCalledTimes(2); // 都在节流期
    });
  });

  describe('错误处理测试', () => {
    it('应该处理函数执行中的错误', () => {
      const errorFn = vi.fn(() => {
        throw new Error('Test error');
      });
      const throttledFn = misc_throttle(errorFn, 1000);

      expect(() => throttledFn()).toThrow('Test error');
      expect(errorFn).toHaveBeenCalledTimes(1);
      
      // 节流仍然应该生效
      expect(() => throttledFn()).not.toThrow();
      expect(errorFn).toHaveBeenCalledTimes(1);
    });

    it('应该处理异步函数', () => {
      const asyncFn = vi.fn(async () => {
        return 'async result';
      });
      const throttledFn = misc_throttle(asyncFn, 1000);

      throttledFn();
      expect(asyncFn).toHaveBeenCalledTimes(1);
      
      throttledFn();
      expect(asyncFn).toHaveBeenCalledTimes(1);
    });

    it('应该处理返回值', () => {
      const returnFn = vi.fn(() => 'test result');
      const throttledFn = misc_throttle(returnFn, 1000);

      const result = throttledFn();
      expect(result).toBeUndefined(); // 节流函数不返回值
      expect(returnFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('实际使用场景测试', () => {
    it('滚动事件节流', () => {
      const scrollHandler = vi.fn();
      const throttledScroll = misc_throttle(scrollHandler, 100);

      // 模拟快速滚动事件
      for (let i = 0; i < 50; i++) {
        throttledScroll({ scrollY: i * 10 });
        vi.advanceTimersByTime(10); // 每10ms触发一次
      }
      
      // 在500ms内，100ms间隔应该执行5次
      expect(scrollHandler).toHaveBeenCalledTimes(5);
    });

    it('鼠标移动事件节流', () => {
      const mouseMoveHandler = vi.fn();
      const throttledMouseMove = misc_throttle(mouseMoveHandler, 50);

      // 模拟鼠标移动
      for (let i = 0; i < 20; i++) {
        throttledMouseMove({ x: i, y: i });
        vi.advanceTimersByTime(25); // 每25ms触发一次
      }
      
      // 在500ms内，50ms间隔应该执行10次
      expect(mouseMoveHandler).toHaveBeenCalledTimes(10);
    });

    it('API请求节流', () => {
      const apiCall = vi.fn();
      const throttledApiCall = misc_throttle(apiCall, 1000);

      // 模拟用户快速操作
      throttledApiCall('/api/search', { q: 'a' });
      throttledApiCall('/api/search', { q: 'ab' });
      throttledApiCall('/api/search', { q: 'abc' });
      
      expect(apiCall).toHaveBeenCalledTimes(1);
      expect(apiCall).toHaveBeenCalledWith('/api/search', { q: 'a' });
      
      vi.advanceTimersByTime(1000);
      throttledApiCall('/api/search', { q: 'abcd' });
      expect(apiCall).toHaveBeenCalledTimes(2);
    });

    it('按钮点击节流', () => {
      const clickHandler = vi.fn();
      const throttledClick = misc_throttle(clickHandler, 2000);

      // 防止重复点击
      throttledClick();
      expect(clickHandler).toHaveBeenCalledTimes(1);
      
      // 快速重复点击应该被忽略
      for (let i = 0; i < 10; i++) {
        throttledClick();
      }
      expect(clickHandler).toHaveBeenCalledTimes(1);
      
      vi.advanceTimersByTime(2000);
      throttledClick();
      expect(clickHandler).toHaveBeenCalledTimes(2);
    });

    it('窗口resize事件节流', () => {
      const resizeHandler = vi.fn();
      const throttledResize = misc_throttle(resizeHandler, 250);

      // 模拟连续resize事件
      for (let i = 0; i < 100; i++) {
        throttledResize({ width: 800 + i, height: 600 + i });
        vi.advanceTimersByTime(10);
      }
      
      // 在1000ms内，250ms间隔应该执行4次
      expect(resizeHandler).toHaveBeenCalledTimes(4);
    });
  });

  describe('性能测试', () => {
    it('应该高效处理大量调用', () => {
      const mockFn = vi.fn();
      const throttledFn = misc_throttle(mockFn, 1000);

      const start = performance.now();
      
      // 大量快速调用
      for (let i = 0; i < 100000; i++) {
        throttledFn();
      }
      
      const end = performance.now();
      
      // 节流函数调用应该很快
      expect(end - start).toBeLessThan(500);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('应该正确管理内部状态', () => {
      const mockFn = vi.fn();
      const throttledFn = misc_throttle(mockFn, 1000);

      // 多轮节流测试
      for (let round = 0; round < 5; round++) {
        throttledFn();
        expect(mockFn).toHaveBeenCalledTimes(round + 1);
        
        // 节流期间的调用
        for (let i = 0; i < 10; i++) {
          throttledFn();
        }
        expect(mockFn).toHaveBeenCalledTimes(round + 1);
        
        vi.advanceTimersByTime(1000);
      }
    });
  });

  describe('边界条件测试', () => {
    it('应该处理undefined和null间隔', () => {
      const mockFn = vi.fn();
      const throttledFn1 = misc_throttle(mockFn, null);
      const throttledFn2 = misc_throttle(mockFn, undefined);

      throttledFn1();
      throttledFn2();
      
      expect(mockFn).toHaveBeenCalledTimes(2);
      
      // 应该使用默认值500ms
      vi.advanceTimersByTime(499);
      throttledFn1();
      throttledFn2();
      expect(mockFn).toHaveBeenCalledTimes(2);
      
      vi.advanceTimersByTime(1);
      throttledFn1();
      throttledFn2();
      expect(mockFn).toHaveBeenCalledTimes(4);
    });

    it('应该处理负数间隔', () => {
      const mockFn = vi.fn();
      const throttledFn = misc_throttle(mockFn, -1000);

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      // 负数间隔应该被处理为默认值
      vi.advanceTimersByTime(500);
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('应该处理非数字间隔', () => {
      const mockFn = vi.fn();
      const throttledFn = misc_throttle(mockFn, 'invalid');

      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(1);
      
      // 非数字间隔应该被处理为默认值
      vi.advanceTimersByTime(500);
      throttledFn();
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });
});