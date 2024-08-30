import { it, expect, describe } from 'vitest';
import array_min from './min.js';

describe('array_min', () => {
    it('应该返回数组中的最小值', () => {
        expect(array_min([1, 2, 3, 4, 5])).toBe(1);
        expect(array_min([5, 4, 3, 2, 1])).toBe(1);
        expect(array_min([-1, -5, 0, 10, 100])).toBe(-5);
    });

    it('应该正确处理包含浮点数的数组', () => {
        expect(array_min([1.5, 2.3, 0.7, 1.1])).toBe(0.7);
    });

    it('应该正确处理包含字符串数字的数组', () => {
        expect(array_min([6, 2, 3, '1', 5])).toBe(1);
        expect(array_min(['10', '5', '1', '50'])).toBe(1);
    });

    it('当数组包含非数字元素时应返回NaN', () => {
        expect(array_min([1, 2, 3, 'a', 5])).toBeNaN();
        expect(array_min(['a', 'b', 'c'])).toBeNaN();
    });

    it('当数组为空时应返回Infinity', () => {
        expect(array_min([])).toBe(Infinity);
    });

    it('应该正确处理只有一个元素的数组', () => {
        expect(array_min([5])).toBe(5);
    });

    it('应该抛出错误当输入不是数组时', () => {
        expect(() => array_min('not an array')).toThrow();
        expect(() => array_min(123)).toThrow();
        expect(() => array_min(null)).toThrow();
        expect(() => array_min(undefined)).toThrow();
    });
});