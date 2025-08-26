import { describe, it, expect } from 'vitest';
import is_phone from './phone.js';

describe('is_phone', () => {
  describe('有效手机号测试', () => {
    it.each([
      ['13812345678', '移动号段 138'],
      ['13912345678', '移动号段 139'], 
      ['15012345678', '联通号段 150'],
      ['15112345678', '联通号段 151'],
      ['18012345678', '电信号段 180'],
      ['18112345678', '电信号段 181'],
      ['17012345678', '虚拟运营商号段'],
      ['19912345678', '5G号段'],
      ['16612345678', '联通号段 166']
    ])('应该识别 %s 为有效手机号 (%s)', (phone) => {
      expect(is_phone(phone)).toBe(true);
    });
  });

  describe('无效手机号测试', () => {
    it.each([
      ['12812345678', '非1开头'],
      ['10812345678', '102号段不存在'],
      ['11812345678', '118号段不存在'],
      ['12012345678', '120号段不存在'],
      ['1381234567', '少于11位'],
      ['138123456789', '超过11位'],
      ['', '空字符串'],
      ['abc12345678', '包含字母'],
      ['138-1234-5678', '包含分隔符'],
      ['138 1234 5678', '包含空格'],
      ['+8613812345678', '包含国际区号'],
      ['13812345678abc', '末尾包含字母']
    ])('应该识别 %s 为无效手机号 (%s)', (phone) => {
      expect(is_phone(phone)).toBe(false);
    });
  });

  describe('边界情况测试', () => {
    it.each([
      [null, 'null值'],
      [undefined, 'undefined值'],
      [13812345678, '数字类型'],
      [[], '空数组'],
      [{}, '空对象'],
      [true, '布尔值true'],
      [false, '布尔值false']
    ])('应该正确处理 %s (%s)', (value) => {
      expect(is_phone(value)).toBe(false);
    });
  });

  describe('特殊号段测试', () => {
    // 测试所有有效的第二位数字
    it.each([
      '13', '14', '15', '16', '17', '18', '19'
    ])('应该识别1%s开头的11位数字为有效手机号', (secondDigit) => {
      const phone = `1${secondDigit}012345678`;
      expect(is_phone(phone)).toBe(true);
    });

    // 测试无效的第二位数字  
    it.each([
      '10', '11', '12'
    ])('应该识别1%s开头的号码为无效手机号', (secondDigit) => {
      const phone = `1${secondDigit}012345678`;
      expect(is_phone(phone)).toBe(false);
    });
  });

  describe('性能测试', () => {
    it('应该快速处理大量手机号验证', () => {
      const phones = Array.from({ length: 1000 }, (_, i) => 
        `138${String(i).padStart(8, '0')}`
      );
      
      const start = performance.now();
      phones.forEach(phone => is_phone(phone));
      const end = performance.now();
      
      // 1000次验证应该在100ms内完成
      expect(end - start).toBeLessThan(100);
    });
  });
});