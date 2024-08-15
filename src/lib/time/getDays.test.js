import { describe, it, expect } from 'vitest';
import time_getDays from './getDays.js';

describe('time_getDays', () => {
    it('shoule get a number days', () => {
        const days_1 = time_getDays();
        expect(days_1).toEqual(31);
        const days_2 = time_getDays(2024, 9);
        expect(days_2).toEqual(30);
    });
});
