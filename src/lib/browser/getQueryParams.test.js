import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import browser_getQueryParams from './getQueryParams.js';

describe('browser_getQueryParams', () => {
  let originalWindow;

  beforeEach(() => {
    originalWindow = global.window;
  });

  afterEach(() => {
    global.window = originalWindow;
  });

  describe('基础URL参数解析', () => {
    it('应该正确解析简单的查询参数', () => {
      const url = 'https://example.com?name=john&age=25';
      const result = browser_getQueryParams(url);
      
      expect(result).toEqual({
        name: 'john',
        age: '25'
      });
    });

    it('应该正确解析包含中文的查询参数', () => {
      const url = 'https://example.com?name=张三&city=北京';
      const result = browser_getQueryParams(url);
      
      expect(result).toEqual({
        name: '张三',
        city: '北京'
      });
    });

    it('应该正确解析编码的查询参数', () => {
      const url = 'https://example.com?name=%E5%BC%A0%E4%B8%89&city=%E5%8C%97%E4%BA%AC';
      const result = browser_getQueryParams(url);
      
      expect(result).toEqual({
        name: '张三',
        city: '北京'
      });
    });

    it('应该正确解析包含特殊字符的参数', () => {
      const url = 'https://example.com?message=hello%20world&symbol=%21%40%23';
      const result = browser_getQueryParams(url);
      
      expect(result).toEqual({
        message: 'hello world',
        symbol: '!@#'
      });
    });

    it('应该正确处理单个参数', () => {
      const url = 'https://example.com?token=abc123';
      const result = browser_getQueryParams(url);
      
      expect(result).toEqual({
        token: 'abc123'
      });
    });
  });

  describe('边界情况处理', () => {
    it('应该处理没有查询参数的URL', () => {
      const url = 'https://example.com';
      const result = browser_getQueryParams(url);
      
      expect(result).toEqual({});
    });

    it('应该处理只有问号没有参数的URL', () => {
      const url = 'https://example.com?';
      const result = browser_getQueryParams(url);
      
      expect(result).toEqual({});
    });

    it('应该处理空值参数', () => {
      const url = 'https://example.com?name=&age=25&city=';
      const result = browser_getQueryParams(url);
      
      expect(result).toEqual({
        name: '',
        age: '25',
        city: ''
      });
    });

    it('应该处理没有值的参数', () => {
      const url = 'https://example.com?flag&name=john';
      const result = browser_getQueryParams(url);
      
      expect(result).toEqual({
        name: 'john'
      });
    });

    it('应该处理重复的参数名（最后一个生效）', () => {
      const url = 'https://example.com?name=john&name=jane&name=bob';
      const result = browser_getQueryParams(url);
      
      expect(result).toEqual({
        name: 'bob'
      });
    });

    it('应该处理包含等号的参数值', () => {
      const url = 'https://example.com?equation=a%3Db%2Bc&formula=x%3D1';
      const result = browser_getQueryParams(url);
      
      expect(result).toEqual({
        equation: 'a=b+c',
        formula: 'x=1'
      });
    });
  });

  describe('复杂URL格式', () => {
    it('应该处理包含端口号的URL', () => {
      const url = 'https://example.com:8080/path?name=john&age=25';
      const result = browser_getQueryParams(url);
      
      expect(result).toEqual({
        name: 'john',
        age: '25'
      });
    });

    it('应该处理包含路径的URL', () => {
      const url = 'https://example.com/user/profile?id=123&tab=settings';
      const result = browser_getQueryParams(url);
      
      expect(result).toEqual({
        id: '123',
        tab: 'settings'
      });
    });

    it('应该处理包含哈希的URL', () => {
      const url = 'https://example.com?name=john&age=25#section1';
      const result = browser_getQueryParams(url);
      
      expect(result).toEqual({
        name: 'john',
        age: '25'
      });
    });

    it('应该处理相对URL', () => {
      const url = '/search?q=javascript&page=1';
      const result = browser_getQueryParams(url);
      
      expect(result).toEqual({
        q: 'javascript',
        page: '1'
      });
    });

    it('应该处理只有查询字符串的URL', () => {
      const url = '?name=john&age=25';
      const result = browser_getQueryParams(url);
      
      expect(result).toEqual({
        name: 'john',
        age: '25'
      });
    });
  });

  describe('多种数据类型', () => {
    it('所有参数值都应该转换为字符串', () => {
      const url = 'https://example.com?number=123&boolean=true&float=3.14';
      const result = browser_getQueryParams(url);
      
      expect(result).toEqual({
        number: '123',
        boolean: 'true',
        float: '3.14'
      });
      
      // 验证所有值都是字符串类型
      Object.values(result).forEach(value => {
        expect(typeof value).toBe('string');
      });
    });

    it('应该正确处理数组形式的参数', () => {
      const url = 'https://example.com?colors=red&colors=blue&colors=green';
      const result = browser_getQueryParams(url);
      
      // 由于实现的限制，重复参数只保留最后一个
      expect(result).toEqual({
        colors: 'green'
      });
    });

    it('应该处理JSON字符串参数', () => {
      const jsonData = encodeURIComponent('{"name":"john","age":25}');
      const url = `https://example.com?data=${jsonData}`;
      const result = browser_getQueryParams(url);
      
      expect(result).toEqual({
        data: '{"name":"john","age":25}'
      });
    });
  });

  describe('默认行为（使用window.location.href）', () => {
    beforeEach(() => {
      global.window = {
        location: {
          href: 'https://example.com/test?default=true&source=window'
        }
      };
    });

    it('当没有传入URL时应该使用window.location.href', () => {
      const result = browser_getQueryParams();
      
      expect(result).toEqual({
        default: 'true',
        source: 'window'
      });
    });

    it('当传入null时应该使用window.location.href', () => {
      const result = browser_getQueryParams(null);
      
      expect(result).toEqual({
        default: 'true',
        source: 'window'
      });
    });

    it('当传入undefined时应该使用window.location.href', () => {
      const result = browser_getQueryParams(undefined);
      
      expect(result).toEqual({
        default: 'true',
        source: 'window'
      });
    });

    it('当传入空字符串时应该解析空字符串而不是window.location.href', () => {
      const result = browser_getQueryParams('');
      
      expect(result).toEqual({});
    });
  });

  describe('错误输入处理', () => {
    it('应该处理畸形的URL', () => {
      const malformedUrls = [
        'not-a-url?param=value',
        'ftp://example.com?name=john',
        'javascript:alert(1)?test=value',
        '?name=john&',
        '?&name=john',
        '?name=john&&age=25'
      ];

      malformedUrls.forEach(url => {
        expect(() => browser_getQueryParams(url)).not.toThrow();
      });
    });

    it('应该处理包含无效编码的参数', () => {
      const url = 'https://example.com?name=%ZZ&valid=test';
      
      // 函数应该不抛出异常，即使解码失败
      expect(() => browser_getQueryParams(url)).not.toThrow();
    });

    it('应该处理非字符串输入', () => {
      const inputs = [
        123,
        true,
        {},
        [],
        function() {}
      ];

      inputs.forEach(input => {
        expect(() => browser_getQueryParams(input)).not.toThrow();
      });
    });
  });

  describe('性能测试', () => {
    it('应该快速解析简单URL', () => {
      const url = 'https://example.com?name=john&age=25';
      
      const start = performance.now();
      for (let i = 0; i < 1000; i++) {
        browser_getQueryParams(url);
      }
      const end = performance.now();
      
      const timePerParse = (end - start) / 1000;
      // 每次解析应该在0.1ms内完成
      expect(timePerParse).toBeLessThan(0.1);
    });

    it('应该能够处理包含大量参数的URL', () => {
      // 创建包含100个参数的URL
      const params = Array.from({ length: 100 }, (_, i) => `param${i}=value${i}`);
      const url = `https://example.com?${params.join('&')}`;
      
      const start = performance.now();
      const result = browser_getQueryParams(url);
      const end = performance.now();
      
      expect(Object.keys(result)).toHaveLength(100);
      expect(end - start).toBeLessThan(10); // 应该在10ms内完成
    });

    it('应该能够处理包含长参数值的URL', () => {
      const longValue = 'a'.repeat(10000);
      const url = `https://example.com?data=${encodeURIComponent(longValue)}`;
      
      const start = performance.now();
      const result = browser_getQueryParams(url);
      const end = performance.now();
      
      expect(result.data).toBe(longValue);
      expect(end - start).toBeLessThan(50); // 应该在50ms内完成
    });
  });

  describe('实际使用场景', () => {
    it('应该正确解析搜索页面URL', () => {
      const url = 'https://search.example.com/search?q=javascript&page=2&sort=date&lang=zh-CN';
      const result = browser_getQueryParams(url);
      
      expect(result).toEqual({
        q: 'javascript',
        page: '2',
        sort: 'date',
        lang: 'zh-CN'
      });
    });

    it('应该正确解析电商产品页面URL', () => {
      const url = 'https://shop.example.com/product?id=12345&color=red&size=L&utm_source=google&utm_campaign=summer';
      const result = browser_getQueryParams(url);
      
      expect(result).toEqual({
        id: '12345',
        color: 'red',
        size: 'L',
        utm_source: 'google',
        utm_campaign: 'summer'
      });
    });

    it('应该正确解析OAuth回调URL', () => {
      const url = 'https://example.com/callback?code=abc123&state=xyz789&scope=read%20write';
      const result = browser_getQueryParams(url);
      
      expect(result).toEqual({
        code: 'abc123',
        state: 'xyz789',
        scope: 'read write'
      });
    });

    it('应该正确解析API请求URL', () => {
      const url = 'https://api.example.com/users?limit=10&offset=20&fields=name%2Cemail&filter%5Bactive%5D=true';
      const result = browser_getQueryParams(url);
      
      expect(result).toEqual({
        limit: '10',
        offset: '20',
        fields: 'name,email',
        'filter[active]': 'true'
      });
    });
  });
});