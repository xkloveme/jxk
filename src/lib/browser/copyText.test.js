import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import browser_copyText from './copyText.js';

describe('browser_copyText', () => {
  let originalNavigator;
  let originalDocument;
  let originalWindow;

  beforeEach(() => {
    // 保存原始对象
    originalNavigator = global.navigator;
    originalDocument = global.document;
    originalWindow = global.window;

    // Mock console methods
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    // 恢复原始对象
    global.navigator = originalNavigator;
    global.document = originalDocument;
    global.window = originalWindow;
    
    // 恢复console
    vi.restoreAllMocks();
  });

  describe('现代浏览器 Clipboard API 支持', () => {
    beforeEach(() => {
      // Mock modern clipboard API
      global.navigator = {
        clipboard: {
          writeText: vi.fn()
        }
      };
    });

    it('应该成功复制文本到剪贴板', async () => {
      const testText = 'Hello Clipboard API!';
      global.navigator.clipboard.writeText.mockResolvedValue();

      const result = await browser_copyText(testText);

      expect(result).toBe(true);
      expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith(testText);
      expect(console.log).toHaveBeenCalledWith('复制成功');
    });

    it('应该处理clipboard API失败的情况', async () => {
      const testText = 'Failed copy test';
      const error = new Error('Clipboard access denied');
      global.navigator.clipboard.writeText.mockRejectedValue(error);

      const result = await browser_copyText(testText);

      expect(result).toBe(false);
      expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith(testText);
      expect(console.error).toHaveBeenCalledWith('复制失败：Error: Clipboard access denied');
    });

    it('应该正确复制空字符串', async () => {
      global.navigator.clipboard.writeText.mockResolvedValue();

      const result = await browser_copyText('');

      expect(result).toBe(true);
      expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith('');
    });

    it('应该正确复制长文本', async () => {
      const longText = 'Very long text content '.repeat(1000);
      global.navigator.clipboard.writeText.mockResolvedValue();

      const result = await browser_copyText(longText);

      expect(result).toBe(true);
      expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith(longText);
    });

    it('应该正确复制包含特殊字符的文本', async () => {
      const specialText = '特殊字符: !@#$%^&*()_+-={}[]|\\:";\'<>?,./ 🎉🚀💡';
      global.navigator.clipboard.writeText.mockResolvedValue();

      const result = await browser_copyText(specialText);

      expect(result).toBe(true);
      expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith(specialText);
    });
  });

  describe('传统浏览器 execCommand 支持', () => {
    beforeEach(() => {
      // Mock legacy browser environment
      global.navigator = {}; // No clipboard API

      global.window = {
        getSelection: vi.fn()
      };

      global.document = {
        createElement: vi.fn(),
        body: {
          appendChild: vi.fn(),
          removeChild: vi.fn()
        },
        execCommand: vi.fn()
      };
    });

    it('应该使用传统方法成功复制文本', async () => {
      const testText = 'Legacy copy test';
      const mockInput = {
        value: '',
        select: vi.fn(),
        remove: vi.fn()
      };

      global.window.getSelection.mockReturnValue({}); // Valid selection object
      global.document.createElement.mockReturnValue(mockInput);
      global.document.execCommand.mockReturnValue(true);

      const result = await browser_copyText(testText);

      expect(result).toBe(true);
      expect(global.document.createElement).toHaveBeenCalledWith('input');
      expect(global.document.body.appendChild).toHaveBeenCalledWith(mockInput);
      expect(mockInput.value).toBe(testText);
      expect(mockInput.select).toHaveBeenCalled();
      expect(global.document.execCommand).toHaveBeenCalledWith('copy');
      expect(mockInput.remove).toHaveBeenCalled();
    });

    it('应该处理不支持selection的情况', async () => {
      const testText = 'No selection test';
      global.window.getSelection.mockReturnValue(null);

      const result = await browser_copyText(testText);

      expect(result).toBe(false);
      expect(console.error).toHaveBeenCalledWith('当前浏览器不支持复制');
    });

    it('应该正确处理传统方法复制空字符串', async () => {
      const mockInput = {
        value: '',
        select: vi.fn(),
        remove: vi.fn()
      };

      global.window.getSelection.mockReturnValue({});
      global.document.createElement.mockReturnValue(mockInput);
      global.document.execCommand.mockReturnValue(true);

      const result = await browser_copyText('');

      expect(result).toBe(true);
      expect(mockInput.value).toBe('');
    });

    it('应该正确清理创建的DOM元素', async () => {
      const testText = 'DOM cleanup test';
      const mockInput = {
        value: '',
        select: vi.fn(),
        remove: vi.fn()
      };

      global.window.getSelection.mockReturnValue({});
      global.document.createElement.mockReturnValue(mockInput);
      global.document.execCommand.mockReturnValue(true);

      await browser_copyText(testText);

      expect(mockInput.remove).toHaveBeenCalled();
    });
  });

  describe('边界情况处理', () => {
    it('应该处理null和undefined输入', async () => {
      global.navigator = {
        clipboard: {
          writeText: vi.fn().mockResolvedValue()
        }
      };

      // 测试null
      const resultNull = await browser_copyText(null);
      expect(resultNull).toBe(true);
      expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith(null);

      // 测试undefined
      const resultUndefined = await browser_copyText(undefined);
      expect(resultUndefined).toBe(true);
      expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith(undefined);
    });

    it('应该处理数字输入', async () => {
      global.navigator = {
        clipboard: {
          writeText: vi.fn().mockResolvedValue()
        }
      };

      const result = await browser_copyText(12345);
      expect(result).toBe(true);
      expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith(12345);
    });

    it('应该处理对象输入', async () => {
      global.navigator = {
        clipboard: {
          writeText: vi.fn().mockResolvedValue()
        }
      };

      const testObject = { key: 'value' };
      const result = await browser_copyText(testObject);
      expect(result).toBe(true);
      expect(global.navigator.clipboard.writeText).toHaveBeenCalledWith(testObject);
    });
  });

  describe('浏览器兼容性', () => {
    it('应该优先使用现代Clipboard API', async () => {
      global.navigator = {
        clipboard: {
          writeText: vi.fn().mockResolvedValue()
        }
      };

      global.window = {
        getSelection: vi.fn().mockReturnValue({})
      };

      global.document = {
        createElement: vi.fn(),
        execCommand: vi.fn()
      };

      const testText = 'Priority test';
      await browser_copyText(testText);

      // 应该使用Clipboard API而不是传统方法
      expect(global.navigator.clipboard.writeText).toHaveBeenCalled();
      expect(global.document.createElement).not.toHaveBeenCalled();
      expect(global.document.execCommand).not.toHaveBeenCalled();
    });

    it('在没有任何复制支持时应该返回false', async () => {
      global.navigator = {}; // No clipboard API
      global.window = {
        getSelection: vi.fn().mockReturnValue(null) // No selection support
      };

      const result = await browser_copyText('No support test');

      expect(result).toBe(false);
      expect(console.error).toHaveBeenCalledWith('当前浏览器不支持复制');
    });
  });

  describe('性能测试', () => {
    it('复制操作应该在合理时间内完成', async () => {
      global.navigator = {
        clipboard: {
          writeText: vi.fn().mockResolvedValue()
        }
      };

      const testText = 'Performance test';
      const start = performance.now();
      
      await browser_copyText(testText);
      
      const end = performance.now();
      const duration = end - start;

      // 复制操作应该在50ms内完成
      expect(duration).toBeLessThan(50);
    });

    it('应该能够快速处理多次连续复制', async () => {
      global.navigator = {
        clipboard: {
          writeText: vi.fn().mockResolvedValue()
        }
      };

      const start = performance.now();
      
      const promises = [];
      for (let i = 0; i < 10; i++) {
        promises.push(browser_copyText(`Test ${i}`));
      }
      
      await Promise.all(promises);
      
      const end = performance.now();
      const duration = end - start;

      // 10次复制操作应该在100ms内完成
      expect(duration).toBeLessThan(100);
      expect(global.navigator.clipboard.writeText).toHaveBeenCalledTimes(10);
    });
  });

  describe('错误恢复', () => {
    it('应该在Clipboard API失败时不抛出未捕获的异常', async () => {
      global.navigator = {
        clipboard: {
          writeText: vi.fn().mockRejectedValue(new Error('Permission denied'))
        }
      };

      // 确保不会抛出未捕获的异常
      await expect(browser_copyText('Error test')).resolves.toBe(false);
    });

    it('应该在传统方法中正确处理DOM操作异常', async () => {
      global.navigator = {};
      global.window = {
        getSelection: vi.fn().mockReturnValue({})
      };

      global.document = {
        createElement: vi.fn().mockImplementation(() => {
          throw new Error('createElement failed');
        }),
        body: {
          appendChild: vi.fn(),
          removeChild: vi.fn()
        }
      };

      // 即使DOM操作失败，也不应该抛出未捕获的异常
      const result = await browser_copyText('DOM error test');
      expect(typeof result).toBe('boolean');
    });
  });
});