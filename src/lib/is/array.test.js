import { describe, it, expect } from 'vitest';
import is_array from './array.js';

describe('is_array', () => {
    it('should return `true` for arrays', () => {
        expect(is_array([1, 2, 3])).toBe(true);
    });

    it('should be return `false` for non-arrays', () => {
        expect(is_array({})).toBeFalsy();
        expect(is_array({ 1: '1', length: 1 })).toBeFalsy();

        expect(is_array(123)).toBeFalsy();

        expect(is_array(`123`)).toBeFalsy();

        expect(is_array(true)).toBeFalsy();

        expect(is_array(Symbol())).toBeFalsy();

        expect(is_array(/a/)).toBeFalsy();

        expect(is_array(new Date())).toBeFalsy();

        expect(is_array(new Set())).toBeFalsy();

        expect(is_array(new Map())).toBeFalsy();

        expect(is_array(new Error())).toBeFalsy();
    });
});
