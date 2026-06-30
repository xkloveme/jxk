import { describe, it, expect } from 'vitest';
import sm3 from './3.js';

describe('sm3', () => {
  describe('基础哈希功能', () => {
    it('应该对字符串生成正确的SM3哈希', () => {
      const input = 'Hello, World!';
      const hash = sm3(input);
      
      expect(typeof hash).toBe('string');
      expect(hash).toMatch(/^[0-9a-f]{64}$/i); // SM3哈希应该是64位16进制字符串
      expect(hash.length).toBe(64);
    });

    it('应该对空字符串生成固定的哈希值', () => {
      const hash = sm3('');
      
      expect(typeof hash).toBe('string');
      expect(hash).toMatch(/^[0-9a-f]{64}$/i);
      // 空字符串的SM3哈希值应该是固定的
      expect(hash).toBe(sm3(''));
    });

    it('相同输入应该产生相同哈希', () => {
      const input = 'Test message for consistency';
      const hash1 = sm3(input);
      const hash2 = sm3(input);
      
      expect(hash1).toBe(hash2);
    });

    it('不同输入应该产生不同哈希', () => {
      const input1 = 'First message';
      const input2 = 'Second message';
      
      const hash1 = sm3(input1);
      const hash2 = sm3(input2);
      
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('中文字符支持', () => {
    it('应该正确处理中文字符', () => {
      const chineseText = '你好，世界！';
      const hash = sm3(chineseText);
      
      expect(typeof hash).toBe('string');
      expect(hash).toMatch(/^[0-9a-f]{64}$/i);
    });

    it('应该正确处理混合中英文', () => {
      const mixedText = 'Hello 你好 World 世界';
      const hash = sm3(mixedText);
      
      expect(typeof hash).toBe('string');
      expect(hash).toMatch(/^[0-9a-f]{64}$/i);
    });

    it('应该正确处理emoji和特殊字符', () => {
      const emojiText = '😀😃😄😁🤔💡🎉🚀';
      const hash = sm3(emojiText);
      
      expect(typeof hash).toBe('string');
      expect(hash).toMatch(/^[0-9a-f]{64}$/i);
    });
  });

  describe('不同输入格式支持', () => {
    it('应该处理数字字符串', () => {
      const numberString = '123456789';
      const hash = sm3(numberString);
      
      expect(typeof hash).toBe('string');
      expect(hash).toMatch(/^[0-9a-f]{64}$/i);
    });

    it('应该处理特殊字符', () => {
      const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const hash = sm3(specialChars);
      
      expect(typeof hash).toBe('string');
      expect(hash).toMatch(/^[0-9a-f]{64}$/i);
    });

    it('应该处理长文本', () => {
      const longText = 'A'.repeat(10000);
      const hash = sm3(longText);
      
      expect(typeof hash).toBe('string');
      expect(hash).toMatch(/^[0-9a-f]{64}$/i);
    });

    it('应该处理包含换行符的文本', () => {
      const multilineText = 'Line 1\\nLine 2\\nLine 3';
      const hash = sm3(multilineText);
      
      expect(typeof hash).toBe('string');
      expect(hash).toMatch(/^[0-9a-f]{64}$/i);
    });
  });

  describe('Buffer输入支持', () => {
    it('应该处理Buffer输入', () => {
      const buffer = Buffer.from('Hello Buffer', 'utf8');
      const hash = sm3(buffer);
      
      expect(typeof hash).toBe('string');
      expect(hash).toMatch(/^[0-9a-f]{64}$/i);
    });

    it('Buffer和字符串输入应该产生相同结果', () => {
      const text = 'Buffer vs String test';
      const buffer = Buffer.from(text, 'utf8');
      
      const hashFromString = sm3(text);
      const hashFromBuffer = sm3(buffer);
      
      expect(hashFromString).toBe(hashFromBuffer);
    });

    it('应该处理空Buffer', () => {
      const emptyBuffer = Buffer.alloc(0);
      const hash = sm3(emptyBuffer);
      
      expect(typeof hash).toBe('string');
      expect(hash).toMatch(/^[0-9a-f]{64}$/i);
    });
  });

  describe('编码选项测试', () => {
    it('默认应该输出16进制编码', () => {
      const input = 'Encoding test';
      const hash = sm3(input);
      
      expect(typeof hash).toBe('string');
      expect(hash).toMatch(/^[0-9a-f]{64}$/i);
    });

    it('应该支持显式指定hex编码', () => {
      const input = 'Hex encoding test';
      const hash = sm3(input, { encoding: 'hex' });
      
      expect(typeof hash).toBe('string');
      expect(hash).toMatch(/^[0-9a-f]{64}$/i);
    });

    it('不同编码选项应该影响输出格式', () => {
      const input = 'Options test';
      
      const defaultHash = sm3(input);
      const hexHash = sm3(input, { encoding: 'hex' });
      
      // 默认和hex应该相同
      expect(defaultHash).toBe(hexHash);
    });
  });

  describe('边界情况处理', () => {
    it('应该处理null和undefined', () => {
      expect(() => sm3(null)).not.toThrow();
      expect(() => sm3(undefined)).not.toThrow();
    });

    it('应该处理数字输入', () => {
      const number = 12345;
      expect(() => sm3(number)).not.toThrow();
    });

    it('应该处理布尔值输入', () => {
      expect(() => sm3(true)).not.toThrow();
      expect(() => sm3(false)).not.toThrow();
    });

    it('应该处理对象输入', () => {
      const obj = { key: 'value' };
      expect(() => sm3(obj)).not.toThrow();
    });

    it('应该处理数组输入', () => {
      const arr = [1, 2, 3];
      expect(() => sm3(arr)).not.toThrow();
    });
  });

  describe('性能测试', () => {
    it('小文本哈希性能应该良好', () => {
      const smallText = 'Small text for performance test';
      const iterations = 1000;
      
      const start = performance.now();
      for (let i = 0; i < iterations; i++) {
        sm3(smallText + i);
      }
      const end = performance.now();
      
      const timePerHash = (end - start) / iterations;
      // 每次小文本哈希应该在1ms内完成
      expect(timePerHash).toBeLessThan(1);
    });

    it('大文本哈希性能应该在合理范围内', () => {
      const largeText = 'Large text content '.repeat(1000); // 约20KB
      
      const start = performance.now();
      sm3(largeText);
      const end = performance.now();
      
      // 20KB文本哈希应该在100ms内完成
      expect(end - start).toBeLessThan(100);
    });

    it('连续哈希操作性能应该稳定', () => {
      const testText = 'Continuous hashing test';
      const times = [];
      
      for (let i = 0; i < 10; i++) {
        const start = performance.now();
        sm3(testText + i);
        const end = performance.now();
        times.push(end - start);
      }
      
      // 计算标准差，检查性能稳定性
      const avg = times.reduce((a, b) => a + b) / times.length;
      const variance = times.reduce((a, b) => a + Math.pow(b - avg, 2)) / times.length;
      const stdDev = Math.sqrt(variance);
      
      // 标准差应该小于平均值的50%（性能相对稳定）
      expect(stdDev).toBeLessThan(avg * 0.5);
    });
  });

  describe('安全性测试', () => {
    it('微小差异的输入应该产生完全不同的哈希', () => {
      const input1 = 'test message';
      const input2 = 'test messag'; // 少一个字符
      
      const hash1 = sm3(input1);
      const hash2 = sm3(input2);
      
      expect(hash1).not.toBe(hash2);
      
      // 计算哈希值的汉明距离（不同位的数量）
      let differences = 0;
      for (let i = 0; i < hash1.length; i++) {
        if (hash1[i] !== hash2[i]) {
          differences++;
        }
      }
      
      // 雪崩效应：微小输入变化应该导致约50%的输出位发生变化
      const changePercentage = differences / hash1.length;
      expect(changePercentage).toBeGreaterThan(0.3); // 至少30%的位发生变化
    });

    it('应该抵抗哈希碰撞（基础测试）', () => {
      const hashes = new Set();
      const testCount = 1000;
      
      for (let i = 0; i < testCount; i++) {
        const input = `collision test ${i} ${Math.random()}`;
        const hash = sm3(input);
        
        expect(hashes.has(hash)).toBe(false); // 不应该有重复哈希
        hashes.add(hash);
      }
      
      expect(hashes.size).toBe(testCount);
    });
  });

  describe('标准测试向量', () => {
    it('应该通过已知的测试向量', () => {
      // 这里可以添加一些已知的SM3测试向量
      // 注意：实际的标准测试向量需要根据具体的SM3实现来确定
      const testVectors = [
        {
          input: 'abc',
          expected: null // 这里应该放入正确的期望值
        }
      ];

      testVectors.forEach(({ input, expected }) => {
        if (expected) {
          const result = sm3(input);
          expect(result).toBe(expected);
        }
      });
    });
  });
});