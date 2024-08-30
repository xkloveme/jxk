import { describe, it, expect } from 'vitest';
import time_timestampToDate from './timestampToDate.js';

describe('time_timestampToDate', () => {
    // 有效输入测试
    it.each([
        [1704067200, new Date(1704067200 * 1000)],
        [1704067200000, new Date(1704067200000)],
        ['1704067200', new Date(1704067200 * 1000)],
        ['1704067200000', new Date(1704067200000)]
    ])('应该正确处理有效的时间戳 %s', (input, expected) => {
        expect(time_timestampToDate(input)).toEqual(expected);
    });

    // 无效输入测试
    it.each([
        ['invalid'],
        [null],
        [undefined],
        [{}],
        [-1234567890],
        [123],
        [123456789012]
    ])('应该对无效输入 %s 返回 null', (input) => {
        expect(time_timestampToDate(input)).toBeNull();
    });

    // 边界值测试
    it.each([
        [9999999999, new Date(9999999999 * 1000)],
        [1000000000000, new Date(1000000000000)],
        [9999999999999, new Date(9999999999999)]
    ])('应该正确处理边界值 %s', (input, expected) => {
        expect(time_timestampToDate(input)).toEqual(expected);
    });
});