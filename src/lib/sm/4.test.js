import { describe, it, expect } from 'vitest';
import sm4 from './4.js';

describe('sm4', () => {
  const testKey = '0123456789abcdeffedcba9876543210'; // 128位密钥
  const testIV = 'fedcba98765432100123456789abcdef';  // 128位初始向量

  describe('基础加密解密', () => {
    it('应该正确加密和解密字符串', () => {
      const originalData = 'Hello SM4 Encryption!';
      
      const encrypted = sm4.encrypt(originalData, testKey);
      expect(typeof encrypted).toBe('string');
      expect(encrypted).toMatch(/^[0-9a-f]+$/i);
      expect(encrypted.length).toBeGreaterThan(0);
      
      const decrypted = sm4.decrypt(encrypted, testKey);
      expect(decrypted).toBe(originalData);
    });

    it('应该正确处理中文字符', () => {
      const chineseText = '你好，SM4加密算法！';
      
      const encrypted = sm4.encrypt(chineseText, testKey);
      const decrypted = sm4.decrypt(encrypted, testKey);
      
      expect(decrypted).toBe(chineseText);
    });

    it('应该正确处理空字符串', () => {
      const emptyString = '';
      
      const encrypted = sm4.encrypt(emptyString, testKey);
      expect(encrypted).toBe(emptyString);
      
      const decrypted = sm4.decrypt(emptyString, testKey);
      expect(decrypted).toBe(emptyString);
    });

    it('应该正确处理长文本', () => {
      const longText = 'This is a very long text for testing SM4 encryption with long content. '.repeat(100);
      
      const encrypted = sm4.encrypt(longText, testKey);
      const decrypted = sm4.decrypt(encrypted, testKey);
      
      expect(decrypted).toBe(longText);
    });
  });

  describe('加密模式测试', () => {
    const testData = 'ECB vs CBC mode test';

    it('应该支持ECB模式（默认）', () => {
      const encrypted = sm4.encrypt(testData, testKey);
      const decrypted = sm4.decrypt(encrypted, testKey);
      expect(decrypted).toBe(testData);
    });

    it('应该支持显式指定ECB模式', () => {
      const encrypted = sm4.encrypt(testData, testKey, { mode: 'ecb' });
      const decrypted = sm4.decrypt(encrypted, testKey, { mode: 'ecb' });
      expect(decrypted).toBe(testData);
    });

    it('应该支持CBC模式', () => {
      const encrypted = sm4.encrypt(testData, testKey, { 
        mode: 'cbc', 
        iv: testIV 
      });
      const decrypted = sm4.decrypt(encrypted, testKey, { 
        mode: 'cbc', 
        iv: testIV 
      });
      expect(decrypted).toBe(testData);
    });

    it('ECB和CBC模式应该产生不同的密文', () => {
      const encryptedECB = sm4.encrypt(testData, testKey, { mode: 'ecb' });
      const encryptedCBC = sm4.encrypt(testData, testKey, { 
        mode: 'cbc', 
        iv: testIV 
      });
      
      expect(encryptedECB).not.toBe(encryptedCBC);
    });

    it('相同内容的多个块在ECB模式下应该产生相同密文', () => {
      const repeatedData = 'AAAAAAAAAAAAAAAA'; // 16字节，正好一个块
      const doubleData = repeatedData + repeatedData; // 两个相同的块
      
      const encrypted = sm4.encrypt(doubleData, testKey, { mode: 'ecb' });
      
      // ECB模式下，相同的明文块应该产生相同的密文块
      const firstBlock = encrypted.slice(0, 32);  // 前16字节的十六进制
      const secondBlock = encrypted.slice(32, 64); // 后16字节的十六进制
      
      expect(firstBlock).toBe(secondBlock);
    });

    it('相同内容的多个块在CBC模式下应该产生不同密文', () => {
      const repeatedData = 'AAAAAAAAAAAAAAAA';
      const doubleData = repeatedData + repeatedData;
      
      const encrypted = sm4.encrypt(doubleData, testKey, { 
        mode: 'cbc', 
        iv: testIV 
      });
      
      // CBC模式下，相同的明文块应该产生不同的密文块
      const firstBlock = encrypted.slice(0, 32);
      const secondBlock = encrypted.slice(32, 64);
      
      expect(firstBlock).not.toBe(secondBlock);
    });
  });

  describe('填充方式测试', () => {
    const testData = 'Padding test data';

    it('应该支持PKCS7填充（默认）', () => {
      const encrypted = sm4.encrypt(testData, testKey);
      const decrypted = sm4.decrypt(encrypted, testKey);
      expect(decrypted).toBe(testData);
    });

    it('应该支持显式指定PKCS7填充', () => {
      const encrypted = sm4.encrypt(testData, testKey, { padding: 'pkcs7' });
      const decrypted = sm4.decrypt(encrypted, testKey, { padding: 'pkcs7' });
      expect(decrypted).toBe(testData);
    });

    it('应该支持无填充模式', () => {
      // 无填充模式需要数据长度是16字节的倍数
      const sixteenByteData = '1234567890123456'; // 正好16字节
      
      const encrypted = sm4.encrypt(sixteenByteData, testKey, { padding: 'none' });
      const decrypted = sm4.decrypt(encrypted, testKey, { padding: 'none' });
      
      expect(decrypted).toBe(sixteenByteData);
    });

    it('无填充模式对非16字节倍数数据应该正常处理', () => {
      const oddLengthData = 'Not 16 byte multiple';
      
      // 无填充模式应该能够处理（或者根据实现返回原数据）
      const encrypted = sm4.encrypt(oddLengthData, testKey, { padding: 'none' });
      const decrypted = sm4.decrypt(encrypted, testKey, { padding: 'none' });
      
      // 验证处理结果
      expect(typeof encrypted).toBe('string');
      expect(typeof decrypted).toBe('string');
    });
  });

  describe('输出格式测试', () => {
    const testData = 'Output format test';

    it('应该默认输出十六进制字符串', () => {
      const encrypted = sm4.encrypt(testData, testKey);
      
      expect(typeof encrypted).toBe('string');
      expect(encrypted).toMatch(/^[0-9a-f]+$/i);
    });

    it('应该支持显式指定hex输出', () => {
      const encrypted = sm4.encrypt(testData, testKey, { output: 'hex' });
      
      expect(typeof encrypted).toBe('string');
      expect(encrypted).toMatch(/^[0-9a-f]+$/i);
    });

    it('应该支持数组输出格式', () => {
      const encrypted = sm4.encrypt(testData, testKey, { output: 'array' });
      
      expect(Array.isArray(encrypted)).toBe(true);
      expect(encrypted.every(byte => 
        Number.isInteger(byte) && byte >= 0 && byte <= 255
      )).toBe(true);
    });

    it('解密应该支持UTF8输出（默认）', () => {
      const encrypted = sm4.encrypt(testData, testKey);
      const decrypted = sm4.decrypt(encrypted, testKey);
      
      expect(typeof decrypted).toBe('string');
      expect(decrypted).toBe(testData);
    });

    it('解密应该支持数组输出', () => {
      const encrypted = sm4.encrypt(testData, testKey);
      const decrypted = sm4.decrypt(encrypted, testKey, { output: 'array' });
      
      expect(Array.isArray(decrypted)).toBe(true);
    });
  });

  describe('数组输入输出测试', () => {
    it('应该支持Uint8Array输入', () => {
      const textData = 'Array input test';
      const arrayData = new TextEncoder().encode(textData);
      
      const encrypted = sm4.encrypt(arrayData, testKey);
      const decrypted = sm4.decrypt(encrypted, testKey);
      
      expect(decrypted).toBe(textData);
    });

    it('数组输入和字符串输入应该产生相同结果', () => {
      const textData = 'Consistency test';
      const arrayData = new TextEncoder().encode(textData);
      
      const encryptedFromString = sm4.encrypt(textData, testKey);
      const encryptedFromArray = sm4.encrypt(arrayData, testKey);
      
      expect(encryptedFromString).toBe(encryptedFromArray);
    });

    it('应该支持完整的数组到数组加解密流程', () => {
      const originalArray = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
      
      const encrypted = sm4.encrypt(originalArray, testKey, { output: 'array' });
      const decrypted = sm4.decrypt(encrypted, testKey, { output: 'array' });
      
      expect(decrypted).toEqual(originalArray);
    });
  });

  describe('JSON数据处理', () => {
    it('应该正确处理JSON对象', () => {
      const jsonData = { name: 'test', value: 123, array: [1, 2, 3] };
      const jsonString = JSON.stringify(jsonData);
      
      const encrypted = sm4.encrypt(jsonString, testKey);
      const decrypted = sm4.decrypt(encrypted, testKey);
      
      expect(decrypted).toEqual(jsonData); // 自动解析为对象
    });

    it('应该正确处理JSON数组', () => {
      const jsonArray = [1, 2, 3, { key: 'value' }];
      const jsonString = JSON.stringify(jsonArray);
      
      const encrypted = sm4.encrypt(jsonString, testKey);
      const decrypted = sm4.decrypt(encrypted, testKey);
      
      expect(decrypted).toEqual(jsonArray);
    });

    it('应该正确处理非JSON字符串', () => {
      const plainText = 'This is not a JSON string';
      
      const encrypted = sm4.encrypt(plainText, testKey);
      const decrypted = sm4.decrypt(encrypted, testKey);
      
      expect(decrypted).toBe(plainText);
    });

    it('应该处理格式错误的JSON', () => {
      const malformedJson = '{"invalid": json}';
      
      const encrypted = sm4.encrypt(malformedJson, testKey);
      const decrypted = sm4.decrypt(encrypted, testKey);
      
      // 解析失败时应该返回原始字符串
      expect(decrypted).toBe(malformedJson);
    });
  });

  describe('密钥格式测试', () => {
    const testData = 'Key format test';

    it('应该支持十六进制字符串密钥', () => {
      const hexKey = '0123456789abcdeffedcba9876543210';
      
      const encrypted = sm4.encrypt(testData, hexKey);
      const decrypted = sm4.decrypt(encrypted, hexKey);
      
      expect(decrypted).toBe(testData);
    });

    it('应该支持Uint8Array密钥', () => {
      const arrayKey = new Uint8Array([
        0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef,
        0xfe, 0xdc, 0xba, 0x98, 0x76, 0x54, 0x32, 0x10
      ]);
      
      const encrypted = sm4.encrypt(testData, arrayKey);
      const decrypted = sm4.decrypt(encrypted, arrayKey);
      
      expect(decrypted).toBe(testData);
    });

    it('十六进制密钥和数组密钥应该产生相同结果', () => {
      const hexKey = '0123456789abcdeffedcba9876543210';
      const arrayKey = new Uint8Array([
        0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef,
        0xfe, 0xdc, 0xba, 0x98, 0x76, 0x54, 0x32, 0x10
      ]);
      
      const encryptedWithHex = sm4.encrypt(testData, hexKey);
      const encryptedWithArray = sm4.encrypt(testData, arrayKey);
      
      expect(encryptedWithHex).toBe(encryptedWithArray);
    });
  });

  describe('错误处理', () => {
    it('应该处理null和undefined输入', () => {
      expect(sm4.encrypt(null, testKey)).toBe(null);
      expect(sm4.encrypt(undefined, testKey)).toBe(undefined);
      expect(sm4.decrypt(null, testKey)).toBe(null);
      expect(sm4.decrypt(undefined, testKey)).toBe(undefined);
    });

    it('应该处理无效的密钥', () => {
      const testData = 'Error handling test';
      const invalidKey = 'invalid_key';
      
      // 根据实现，可能抛出错误或返回原数据
      const result = sm4.encrypt(testData, invalidKey);
      expect(result).toBeDefined();
    });

    it('应该处理无效的密文', () => {
      const invalidCiphertext = 'invalid_ciphertext';
      
      // 解密失败时应该返回原数据
      const result = sm4.decrypt(invalidCiphertext, testKey);
      expect(result).toBe(invalidCiphertext);
    });

    it('应该处理CBC模式缺少IV的情况', () => {
      const testData = 'CBC without IV test';
      
      // 没有IV的CBC模式应该能够处理（或抛出合适的错误）
      expect(() => {
        sm4.encrypt(testData, testKey, { mode: 'cbc' });
      }).not.toThrow();
    });

    it('解密失败时应该返回原数据', () => {
      const testData = 'Decryption failure test';
      const encrypted = sm4.encrypt(testData, testKey);
      const wrongKey = 'fedcba98765432100123456789abcdef';
      
      // 用错误密钥解密应该返回原数据而不是抛出错误
      const result = sm4.decrypt(encrypted, wrongKey);
      expect(result).toBe(encrypted); // 应该返回原密文
    });
  });

  describe('性能测试', () => {
    it('小数据加密性能应该良好', () => {
      const smallData = 'Small data for performance test';
      const iterations = 1000;
      
      const start = performance.now();
      for (let i = 0; i < iterations; i++) {
        const encrypted = sm4.encrypt(smallData + i, testKey);
        sm4.decrypt(encrypted, testKey);
      }
      const end = performance.now();
      
      const timePerOperation = (end - start) / iterations;
      // 每次加解密操作应该在5ms内完成
      expect(timePerOperation).toBeLessThan(5);
    });

    it('大数据加密性能应该在合理范围内', () => {
      const largeData = 'Large data content for performance testing. '.repeat(1000); // 约45KB
      
      const start = performance.now();
      const encrypted = sm4.encrypt(largeData, testKey);
      const decrypted = sm4.decrypt(encrypted, testKey);
      const end = performance.now();
      
      expect(decrypted).toBe(largeData);
      // 45KB数据加解密应该在500ms内完成
      expect(end - start).toBeLessThan(500);
    });

    it('不同模式的性能比较', () => {
      const testData = 'Performance comparison test data';
      
      // ECB模式性能测试
      const ecbStart = performance.now();
      for (let i = 0; i < 100; i++) {
        const encrypted = sm4.encrypt(testData, testKey, { mode: 'ecb' });
        sm4.decrypt(encrypted, testKey, { mode: 'ecb' });
      }
      const ecbEnd = performance.now();
      
      // CBC模式性能测试
      const cbcStart = performance.now();
      for (let i = 0; i < 100; i++) {
        const encrypted = sm4.encrypt(testData, testKey, { mode: 'cbc', iv: testIV });
        sm4.decrypt(encrypted, testKey, { mode: 'cbc', iv: testIV });
      }
      const cbcEnd = performance.now();
      
      const ecbTime = ecbEnd - ecbStart;
      const cbcTime = cbcEnd - cbcStart;
      
      // 两种模式的性能差异不应该过大
      expect(Math.abs(ecbTime - cbcTime)).toBeLessThan(Math.max(ecbTime, cbcTime));
    });
  });

  describe('安全性测试', () => {
    it('相同数据多次加密应该产生不同结果（如果有随机性）', () => {
      const testData = 'Same data encryption test';
      
      const encrypted1 = sm4.encrypt(testData, testKey);
      const encrypted2 = sm4.encrypt(testData, testKey);
      
      // 如果实现中有随机IV等，每次加密结果可能不同
      // 但解密结果应该相同
      const decrypted1 = sm4.decrypt(encrypted1, testKey);
      const decrypted2 = sm4.decrypt(encrypted2, testKey);
      
      expect(decrypted1).toBe(testData);
      expect(decrypted2).toBe(testData);
    });

    it('不同密钥应该产生完全不同的密文', () => {
      const testData = 'Different key test';
      const key1 = '0123456789abcdeffedcba9876543210';
      const key2 = 'fedcba98765432100123456789abcdef';
      
      const encrypted1 = sm4.encrypt(testData, key1);
      const encrypted2 = sm4.encrypt(testData, key2);
      
      expect(encrypted1).not.toBe(encrypted2);
    });

    it('密文应该看起来随机（基础测试）', () => {
      const testData = 'Randomness test data';
      const encrypted = sm4.encrypt(testData, testKey);
      
      // 检查密文的字符分布是否相对均匀
      const charCounts = {};
      for (let char of encrypted) {
        charCounts[char] = (charCounts[char] || 0) + 1;
      }
      
      const uniqueChars = Object.keys(charCounts).length;
      // 16进制字符最多16种，应该有合理的分布
      expect(uniqueChars).toBeGreaterThan(8);
    });
  });
});