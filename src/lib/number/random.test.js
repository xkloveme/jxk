import { describe, it, expect } from 'vitest';
import number_random from './random.js';

describe('number_random', () => {
    it('应该生成指定范围内的整数', () => {
        const min = 1;
        const max = 10;
        for (let i = 0; i < 100; i++) {
            const random = number_random(min, max);
            expect(random).toBeGreaterThanOrEqual(min);
            expect(random).toBeLessThanOrEqual(max);
            expect(Number.isInteger(random)).toBe(true);
        }
    });

    it('应该生成指定范围内的浮点数', () => {
        const min = 1.5;
        const max = 10.5;
        for (let i = 0; i < 100; i++) {
            const random = number_random(min, max);
            expect(random).toBeGreaterThanOrEqual(min);
            expect(random).toBeLessThanOrEqual(max);
        }
    });

    it('当最小值等于最大值时，应该返回该值', () => {
        expect(number_random(5, 5)).toBe(5);
    });

    it('当最小值大于最大值时，应该交换它们', () => {
        const random = number_random(10, 1);
        expect(random).toBeGreaterThanOrEqual(1);
        expect(random).toBeLessThanOrEqual(10);
    });

    it('应该正确处理负数范围', () => {
        const min = -10;
        const max = -1;
        const random = number_random(min, max);
        expect(random).toBeGreaterThanOrEqual(min);
        expect(random).toBeLessThanOrEqual(max);
    });
});