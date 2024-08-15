import { describe, it, expect } from 'vitest';
import is_idcard from './idcard.js';

describe('is_idcard', () => {
    it('it shoule return a boolean', () => {
        const card_1 = '110101199001013590';
        expect(is_idcard(card_1)).toEqual(true);
        const card_2 = '11010119900101359';
        expect(is_idcard(card_2)).toEqual(false);
    });
});
