import { describe, it, expect } from 'vitest';
import mask_address from './address.js';

describe('mask_address', () => {
  it('应该正确处理空输入', () => {
    expect(mask_address('')).toBe('');
    expect(mask_address(null)).toBe('');
    expect(mask_address(undefined)).toBe('');
  });

  it('应该正确脱敏完整地址', () => {
    expect(mask_address('江苏省南京市鼓楼区中山路18号德基广场写字楼16层')).toBe('江******楼区中山***号德基广******层');
    expect(mask_address('北京市海淀区清华园1号')).toBe('北*********号');
    expect(mask_address('上海市浦东新区陆家嘴环路1000号')).toBe('上***************号');
  });

  it('应该正确处理不同长度的省份名称', () => {
    expect(mask_address('北京市朝阳区')).toBe('北*市朝阳区');
    expect(mask_address('内蒙古自治区呼和浩特市')).toBe('内蒙*******特市');
  });

  it('应该正确脱敏电话号码', () => {
    expect(mask_address('13812345678')).toBe('13*******78');
    expect(mask_address('021-12345678')).toBe('0*1-12****78');
  });

  it('应该正确脱敏普通字符串', () => {
    expect(mask_address('Hello World')).toBe('He*******ld');
    expect(mask_address('OpenAI')).toBe('O****I');
    expect(mask_address('AI')).toBe('A*');
  });

  it('应该正确处理包含特殊字符的地址', () => {
    expect(mask_address('北京市朝阳区建国门外大街1号国贸大厦A座100022')).toBe('北************号国贸大厦A座1****2');
  });

  it('应该正确处理不规范的地址格式', () => {
    expect(mask_address('北京朝阳区建国门外大街1号')).toBe('北***********号');
  });

  it('应该正确处理只有街道名的地址', () => {
    expect(mask_address('中山路18号')).toBe('中****号');
  });

  it('应该正确处理包含英文的地址', () => {
    expect(mask_address('Room 1504, Building A, 123 Main Street, Shanghai')).toBe('Room 1**4, Building A, 1*3 Main Street, Shanghai');
  });

  it('应该正确处理极短的输入', () => {
    expect(mask_address('a')).toBe('*');
    expect(mask_address('ab')).toBe('a*');
    expect(mask_address('abc')).toBe('a*c');
  });
});