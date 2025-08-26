import { describe, it, expect } from 'vitest';
import array_concat from './concat.js';

describe('array_concat', () => {
  describe('基础功能测试', () => {
    it('应该合并两个数组', () => {
      const result = array_concat([1, 2], [3, 4]);
      expect(result).toEqual([1, 2, 3, 4]);
    });

    it('应该合并多个数组', () => {
      const result = array_concat([1, 2], [3, 4], [5, 6]);
      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('应该合并数组和单个元素', () => {
      const result = array_concat([1, 2], 3, [4, 5]);
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('应该合并多个数组和单个元素', () => {
      const result = array_concat([1, 2], [3, 4], 5, [6, 7]);
      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('应该合并单个元素', () => {
      const result = array_concat(1, 2, 3);
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('边界情况测试', () => {
    it('应该处理空数组', () => {
      const result = array_concat([], []);
      expect(result).toEqual([]);
    });

    it('应该处理空数组和非空数组', () => {
      const result = array_concat([], [1, 2], []);
      expect(result).toEqual([1, 2]);
    });

    it('应该处理没有参数的情况', () => {
      const result = array_concat();
      expect(result).toEqual([]);
    });

    it('应该处理单个空数组', () => {
      const result = array_concat([]);
      expect(result).toEqual([]);
    });

    it('应该处理单个非空数组', () => {
      const result = array_concat([1, 2, 3]);
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe('不同数据类型测试', () => {
    it('应该合并不同类型的元素', () => {
      const result = array_concat([1, 2], 'text', [3, 4]);
      expect(result).toEqual([1, 2, 'text', 3, 4]);
    });

    it('应该处理字符串数组', () => {
      const result = array_concat(['a', 'b'], ['c', 'd']);
      expect(result).toEqual(['a', 'b', 'c', 'd']);
    });

    it('应该处理混合类型数组', () => {
      const result = array_concat([1, 'a'], [true, null], [undefined]);
      expect(result).toEqual([1, 'a', true, null, undefined]);
    });

    it('应该处理对象元素', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const result = array_concat([obj1], obj2);
      expect(result).toEqual([obj1, obj2]);
    });

    it('应该处理嵌套数组', () => {
      const result = array_concat([[1, 2]], [[3, 4]]);
      expect(result).toEqual([[1, 2], [3, 4]]);
    });

    it('应该处理函数元素', () => {
      const fn1 = () => 1;
      const fn2 = () => 2;
      const result = array_concat([fn1], fn2);
      expect(result).toEqual([fn1, fn2]);
    });
  });

  describe('特殊值处理', () => {
    it('应该处理null值', () => {
      const result = array_concat([1, 2], null, [3, 4]);
      expect(result).toEqual([1, 2, null, 3, 4]);
    });

    it('应该处理undefined值', () => {
      const result = array_concat([1, 2], undefined, [3, 4]);
      expect(result).toEqual([1, 2, undefined, 3, 4]);
    });

    it('应该处理NaN值', () => {
      const result = array_concat([1, 2], NaN, [3, 4]);
      expect(result).toEqual([1, 2, NaN, 3, 4]);
    });

    it('应该处理0和false', () => {
      const result = array_concat([1], 0, false, [2]);
      expect(result).toEqual([1, 0, false, 2]);
    });

    it('应该处理Symbol', () => {
      const sym = Symbol('test');
      const result = array_concat([1], sym, [2]);
      expect(result).toEqual([1, sym, 2]);
    });
  });

  describe('不变性测试', () => {
    it('应该创建新数组而不修改原数组', () => {
      const arr1 = [1, 2];
      const arr2 = [3, 4];
      const original1 = [...arr1];
      const original2 = [...arr2];
      
      const result = array_concat(arr1, arr2);
      
      expect(arr1).toEqual(original1);
      expect(arr2).toEqual(original2);
      expect(result).not.toBe(arr1);
      expect(result).not.toBe(arr2);
    });

    it('修改结果数组不应该影响原数组', () => {
      const arr1 = [1, 2];
      const result = array_concat(arr1, [3, 4]);
      
      result[0] = 999;
      expect(arr1[0]).toBe(1);
    });

    it('修改原数组不应该影响结果数组', () => {
      const arr1 = [1, 2];
      const result = array_concat(arr1, [3, 4]);
      
      arr1[0] = 999;
      expect(result[0]).toBe(1);
    });
  });

  describe('大量数据测试', () => {
    it('应该处理大数组', () => {
      const largeArray1 = Array.from({ length: 1000 }, (_, i) => i);
      const largeArray2 = Array.from({ length: 1000 }, (_, i) => i + 1000);
      
      const result = array_concat(largeArray1, largeArray2);
      
      expect(result).toHaveLength(2000);
      expect(result[0]).toBe(0);
      expect(result[999]).toBe(999);
      expect(result[1000]).toBe(1000);
      expect(result[1999]).toBe(1999);
    });

    it('应该处理很多小数组', () => {
      const arrays = Array.from({ length: 100 }, (_, i) => [i, i + 0.5]);
      const result = array_concat(...arrays);
      
      expect(result).toHaveLength(200);
      expect(result[0]).toBe(0);
      expect(result[1]).toBe(0.5);
      expect(result[198]).toBe(99);
      expect(result[199]).toBe(99.5);
    });
  });

  describe('性能测试', () => {
    it('应该快速合并中等大小的数组', () => {
      const arr1 = Array.from({ length: 1000 }, (_, i) => i);
      const arr2 = Array.from({ length: 1000 }, (_, i) => i + 1000);
      
      const start = performance.now();
      const result = array_concat(arr1, arr2);
      const end = performance.now();
      
      expect(result).toHaveLength(2000);
      expect(end - start).toBeLessThan(10); // 应该在10ms内完成
    });

    it('应该快速处理大量参数', () => {
      const elements = Array.from({ length: 1000 }, (_, i) => i);
      
      const start = performance.now();
      const result = array_concat(...elements);
      const end = performance.now();
      
      expect(result).toHaveLength(1000);
      expect(end - start).toBeLessThan(50); // 应该在50ms内完成
    });
  });

  describe('实际使用场景', () => {
    it('应该合并API响应数据', () => {
      const page1 = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
      const page2 = [{ id: 3, name: 'Charlie' }, { id: 4, name: 'David' }];
      
      const allUsers = array_concat(page1, page2);
      
      expect(allUsers).toHaveLength(4);
      expect(allUsers[0]).toEqual({ id: 1, name: 'Alice' });
      expect(allUsers[3]).toEqual({ id: 4, name: 'David' });
    });

    it('应该合并配置数组', () => {
      const defaultConfig = ['config1', 'config2'];
      const userConfig = ['config3'];
      const dynamicConfig = ['config4', 'config5'];
      
      const finalConfig = array_concat(defaultConfig, userConfig, dynamicConfig);
      
      expect(finalConfig).toEqual(['config1', 'config2', 'config3', 'config4', 'config5']);
    });

    it('应该合并搜索结果', () => {
      const recentResults = ['result1', 'result2'];
      const newResult = 'result3';
      const relatedResults = ['result4', 'result5'];
      
      const allResults = array_concat(recentResults, newResult, relatedResults);
      
      expect(allResults).toEqual(['result1', 'result2', 'result3', 'result4', 'result5']);
    });

    it('应该构建菜单项', () => {
      const mainMenu = [{ label: 'Home' }, { label: 'About' }];
      const adminMenu = { label: 'Admin' };
      const userMenu = [{ label: 'Profile' }, { label: 'Settings' }];
      
      const fullMenu = array_concat(mainMenu, adminMenu, userMenu);
      
      expect(fullMenu).toHaveLength(5);
      expect(fullMenu[2]).toEqual({ label: 'Admin' });
    });
  });

  describe('类型保持测试', () => {
    it('应该保持数组元素的引用', () => {
      const obj = { shared: true };
      const arr1 = [obj];
      const arr2 = [obj];
      
      const result = array_concat(arr1, arr2);
      
      expect(result[0]).toBe(obj);
      expect(result[1]).toBe(obj);
      expect(result[0]).toBe(result[1]);
    });

    it('应该保持Date对象', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-02');
      
      const result = array_concat([date1], date2);
      
      expect(result[0]).toBeInstanceOf(Date);
      expect(result[1]).toBeInstanceOf(Date);
      expect(result[0]).toBe(date1);
      expect(result[1]).toBe(date2);
    });

    it('应该保持RegExp对象', () => {
      const regex1 = /test1/g;
      const regex2 = /test2/i;
      
      const result = array_concat([regex1], regex2);
      
      expect(result[0]).toBeInstanceOf(RegExp);
      expect(result[1]).toBeInstanceOf(RegExp);
      expect(result[0]).toBe(regex1);
      expect(result[1]).toBe(regex2);
    });
  });
});