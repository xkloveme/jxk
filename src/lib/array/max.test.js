import { it, expect, describe } from 'vitest';
import array_max from './max.js';

describe('array_max', () => {
    it('应该返回数组中的最大值', () => {
        expect(array_max([1, 2, 3, 4, 5])).toBe(5);
        expect(array_max([5, 4, 3, 2, 1])).toBe(5);
        expect(array_max([-1, -5, 0, 10, 100])).toBe(100);
    });

    it('应该正确处理包含浮点数的数组', () => {
        expect(array_max([1.5, 2.3, 0.7, 1.1])).toBe(2.3);
    });

    it('应该正确处理包含字符串数字的数组', () => {
        expect(array_max([6, 2, 3, '7', 5])).toBe(7);
        expect(array_max(['10', '5', '1', '50'])).toBe(50);
    });

    it('当数组包含非数字元素时应返回NaN', () => {
        expect(array_max([1, 2, 3, 'a', 5])).toBeNaN();
        expect(array_max(['a', 'b', 'c'])).toBeNaN();
    });

    it('当数组为空时应返回-Infinity', () => {
        expect(array_max([])).toBe(-Infinity);
    });

    it('应该正确处理只有一个元素的数组', () => {
        expect(array_max([5])).toBe(5);
    });

    it('应该抛出错误当输入不是数组时', () => {
        expect(() => array_max('not an array')).toThrow();
        expect(() => array_max(123)).toThrow();
        expect(() => array_max(null)).toThrow();
        expect(() => array_max(undefined)).toThrow();
    });
});