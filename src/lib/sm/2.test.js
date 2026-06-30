import { describe, it, expect, beforeAll } from 'vitest';
import sm2 from './2.js';

describe('sm2', () => {
  let sm2Instance;
  let keypair;
  let publicKey;
  let privateKey;

  beforeAll(() => {
    sm2Instance = sm2();
    keypair = sm2Instance.generateKeyPairHex();
    publicKey = keypair.publicKey;
    privateKey = keypair.privateKey;
  });

  describe('密钥对生成', () => {
    it('应该生成有效的密钥对', () => {
      const keyPair = sm2Instance.generateKeyPairHex();
      
      expect(keyPair).toHaveProperty('publicKey');
      expect(keyPair).toHaveProperty('privateKey');
      expect(typeof keyPair.publicKey).toBe('string');
      expect(typeof keyPair.privateKey).toBe('string');
      
      // 公钥应该是130位16进制字符串（未压缩）
      expect(keyPair.publicKey).toMatch(/^04[0-9a-f]{128}$/i);
      // 私钥应该是64位16进制字符串
      expect(keyPair.privateKey).toMatch(/^[0-9a-f]{64}$/i);
    });

    it('应该支持自定义随机数生成密钥对', () => {
      const customRandom = '123456789abcdef123456789abcdef123456789abcdef123456789abcdef12';
      const keyPair = sm2Instance.generateKeyPairHex(customRandom);
      
      expect(keyPair).toHaveProperty('publicKey');
      expect(keyPair).toHaveProperty('privateKey');
      expect(keyPair.publicKey).toMatch(/^04[0-9a-f]{128}$/i);
      expect(keyPair.privateKey).toMatch(/^[0-9a-f]{64}$/i);
    });

    it('每次生成的密钥对应该不同', () => {
      const keyPair1 = sm2Instance.generateKeyPairHex();
      const keyPair2 = sm2Instance.generateKeyPairHex();
      
      expect(keyPair1.publicKey).not.toBe(keyPair2.publicKey);
      expect(keyPair1.privateKey).not.toBe(keyPair2.privateKey);
    });
  });

  describe('公钥操作', () => {
    it('应该能压缩公钥', () => {
      const compressedPublicKey = sm2Instance.compressPublicKeyHex(publicKey);
      
      expect(typeof compressedPublicKey).toBe('string');
      // 压缩公钥应该是66位16进制字符串
      expect(compressedPublicKey).toMatch(/^0[2-3][0-9a-f]{64}$/i);
    });

    it('应该能验证公钥', () => {
      const isValid = sm2Instance.verifyPublicKey(publicKey);
      expect(isValid).toBe(true);
    });

    it('应该能验证压缩后的公钥', () => {
      const compressedPublicKey = sm2Instance.compressPublicKeyHex(publicKey);
      const isValid = sm2Instance.verifyPublicKey(compressedPublicKey);
      expect(isValid).toBe(true);
    });

    it('应该能比较公钥等价性', () => {
      const compressedPublicKey = sm2Instance.compressPublicKeyHex(publicKey);
      const isEqual = sm2Instance.comparePublicKeyHex(publicKey, compressedPublicKey);
      expect(isEqual).toBe(true);
    });

    it('应该拒绝无效的公钥', () => {
      const invalidKeys = [
        '', 
        'invalid',
        '04' + 'a'.repeat(127), // 长度不够
        '04' + 'g'.repeat(128), // 包含无效字符
        '05' + 'a'.repeat(128)  // 错误的前缀
      ];

      invalidKeys.forEach(invalidKey => {
        expect(sm2Instance.verifyPublicKey(invalidKey)).toBe(false);
      });
    });
  });

  describe('加密解密', () => {
    it('应该能正确加密和解密字符串', () => {
      const message = 'Hello SM2 Encryption!';
      const cipherMode = 1; // C1C3C2
      
      const encrypted = sm2Instance.doEncrypt(message, publicKey, cipherMode);
      expect(typeof encrypted).toBe('string');
      expect(encrypted.length).toBeGreaterThan(0);
      
      const decrypted = sm2Instance.doDecrypt(encrypted, privateKey, cipherMode);
      expect(decrypted).toBe(message);
    });

    it('应该支持不同的密文模式', () => {
      const message = 'Test different cipher modes';
      
      // C1C3C2 模式
      const encrypted1 = sm2Instance.doEncrypt(message, publicKey, 1);
      const decrypted1 = sm2Instance.doDecrypt(encrypted1, privateKey, 1);
      expect(decrypted1).toBe(message);
      
      // C1C2C3 模式
      const encrypted0 = sm2Instance.doEncrypt(message, publicKey, 0);
      const decrypted0 = sm2Instance.doDecrypt(encrypted0, privateKey, 0);
      expect(decrypted0).toBe(message);
    });

    it('应该支持数组格式的加解密', () => {
      const messageArray = [72, 101, 108, 108, 111]; // "Hello" 的字节数组
      
      const encrypted = sm2Instance.doEncrypt(messageArray, publicKey, 1);
      const decrypted = sm2Instance.doDecrypt(encrypted, privateKey, 1, {output: 'array'});
      
      expect(Array.isArray(decrypted)).toBe(true);
      expect(decrypted).toEqual(messageArray);
    });

    it('应该支持ASN1编码', () => {
      const message = 'ASN1 encoding test';
      
      const encrypted = sm2Instance.doEncrypt(message, publicKey, 1, { asn1: true });
      const decrypted = sm2Instance.doDecrypt(encrypted, privateKey, 1, { asn1: true });
      
      expect(decrypted).toBe(message);
    });

    it('应该处理空字符串', () => {
      const encrypted = sm2Instance.doEncrypt('', publicKey, 1);
      const decrypted = sm2Instance.doDecrypt(encrypted, privateKey, 1);
      expect(decrypted).toBe('');
    });

    it('每次加密结果应该不同（因为随机数）', () => {
      const message = 'Same message';
      
      const encrypted1 = sm2Instance.doEncrypt(message, publicKey, 1);
      const encrypted2 = sm2Instance.doEncrypt(message, publicKey, 1);
      
      expect(encrypted1).not.toBe(encrypted2);
      
      // 但解密结果应该相同
      const decrypted1 = sm2Instance.doDecrypt(encrypted1, privateKey, 1);
      const decrypted2 = sm2Instance.doDecrypt(encrypted2, privateKey, 1);
      
      expect(decrypted1).toBe(message);
      expect(decrypted2).toBe(message);
    });
  });

  describe('数字签名', () => {
    it('应该能生成和验证签名', () => {
      const message = 'Message to be signed';
      
      const signature = sm2Instance.doSignature(message, privateKey);
      expect(typeof signature).toBe('string');
      expect(signature.length).toBeGreaterThan(0);
      
      const isValid = sm2Instance.doVerifySignature(message, signature, publicKey);
      expect(isValid).toBe(true);
    });

    it('应该支持DER编码的签名', () => {
      const message = 'DER encoding signature test';
      
      const signature = sm2Instance.doSignature(message, privateKey, { der: true });
      const isValid = sm2Instance.doVerifySignature(message, signature, publicKey, { der: true });
      
      expect(isValid).toBe(true);
    });

    it('应该支持SM3哈希的签名', () => {
      const message = 'SM3 hash signature test';
      
      const signature = sm2Instance.doSignature(message, privateKey, { hash: true });
      const isValid = sm2Instance.doVerifySignature(message, signature, publicKey, { hash: true });
      
      expect(isValid).toBe(true);
    });

    it('应该支持带公钥的优化签名', () => {
      const message = 'Optimized signature with public key';
      
      const signature = sm2Instance.doSignature(message, privateKey, { 
        hash: true, 
        publicKey 
      });
      const isValid = sm2Instance.doVerifySignature(message, signature, publicKey, { 
        hash: true, 
        publicKey 
      });
      
      expect(isValid).toBe(true);
    });

    it('应该支持自定义userId的签名', () => {
      const message = 'Custom userId signature test';
      const userId = 'testUserId123';
      
      const signature = sm2Instance.doSignature(message, privateKey, { 
        hash: true, 
        publicKey,
        userId 
      });
      const isValid = sm2Instance.doVerifySignature(message, signature, publicKey, { 
        hash: true,
        userId 
      });
      
      expect(isValid).toBe(true);
    });

    it('不同消息的签名应该不同', () => {
      const message1 = 'First message';
      const message2 = 'Second message';
      
      const signature1 = sm2Instance.doSignature(message1, privateKey);
      const signature2 = sm2Instance.doSignature(message2, privateKey);
      
      expect(signature1).not.toBe(signature2);
    });

    it('错误的签名应该验证失败', () => {
      const message = 'Original message';
      const tamperedMessage = 'Tampered message';
      
      const signature = sm2Instance.doSignature(message, privateKey);
      const isValid = sm2Instance.doVerifySignature(tamperedMessage, signature, publicKey);
      
      expect(isValid).toBe(false);
    });

    it('使用错误公钥验证应该失败', () => {
      const message = 'Test message';
      const wrongKeyPair = sm2Instance.generateKeyPairHex();
      
      const signature = sm2Instance.doSignature(message, privateKey);
      const isValid = sm2Instance.doVerifySignature(message, signature, wrongKeyPair.publicKey);
      
      expect(isValid).toBe(false);
    });
  });

  describe('椭圆曲线点操作', () => {
    it('应该能生成椭圆曲线点', () => {
      const point = sm2Instance.getPoint();
      expect(point).toBeDefined();
    });

    it('应该能使用预生成的点池加速签名', () => {
      const message = 'Point pool signature test';
      const pointPool = [
        sm2Instance.getPoint(),
        sm2Instance.getPoint(),
        sm2Instance.getPoint(),
        sm2Instance.getPoint()
      ];
      
      const signature = sm2Instance.doSignature(message, privateKey, { pointPool });
      const isValid = sm2Instance.doVerifySignature(message, signature, publicKey);
      
      expect(isValid).toBe(true);
    });
  });

  describe('错误处理', () => {
    it('应该处理无效的私钥', () => {
      const message = 'Test message';
      const invalidPrivateKey = 'invalid_private_key';
      
      expect(() => {
        sm2Instance.doSignature(message, invalidPrivateKey);
      }).toThrow();
    });

    it('应该处理无效的公钥加密', () => {
      const message = 'Test message';
      const invalidPublicKey = 'invalid_public_key';
      
      expect(() => {
        sm2Instance.doEncrypt(message, invalidPublicKey, 1);
      }).toThrow();
    });

    it('应该处理无效的密文解密', () => {
      const invalidCiphertext = 'invalid_ciphertext';
      
      expect(() => {
        sm2Instance.doDecrypt(invalidCiphertext, privateKey, 1);
      }).toThrow();
    });
  });

  describe('性能测试', () => {
    it('密钥生成性能应该在合理范围内', () => {
      const start = performance.now();
      
      for (let i = 0; i < 10; i++) {
        sm2Instance.generateKeyPairHex();
      }
      
      const end = performance.now();
      const timePerGeneration = (end - start) / 10;
      
      // 每次密钥生成应该在500ms内完成
      expect(timePerGeneration).toBeLessThan(500);
    });

    it('签名验证性能应该在合理范围内', () => {
      const message = 'Performance test message';
      const start = performance.now();
      
      for (let i = 0; i < 10; i++) {
        const signature = sm2Instance.doSignature(message, privateKey);
        sm2Instance.doVerifySignature(message, signature, publicKey);
      }
      
      const end = performance.now();
      const timePerOperation = (end - start) / 10;
      
      // 每次签名+验证应该在200ms内完成
      expect(timePerOperation).toBeLessThan(200);
    });
  });
});