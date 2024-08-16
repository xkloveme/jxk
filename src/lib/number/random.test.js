import { describe, it, expect } from 'vitest';
import number_random from './random.js';

describe('number_random', () => {
    it('should be in a number range', () => {
        const random1 = number_random(1, 10);
        const random2 = number_random(1.123, 10.123);
        expect(random1).not.toBeUndefined();
        expect(random2).not.toBeUndefined();
        expect(random1).toBeGreaterThanOrEqual(1);
        expect(random1).toBeLessThanOrEqual(10);
        expect(random2).toBeGreaterThanOrEqual(1.123);
        expect(random2).toBeLessThanOrEqual(10.123);
    });
});
