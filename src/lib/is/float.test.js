import { describe, it, expect } from 'vitest';
import is_float from './float.js';

describe('is_float', () => {
    it('should return `true` for arrays', () => {
        expect(is_float(1.23)).toBe(true);
    });

    it('should be return `false` for non-arrays', () => {
        expect(is_float({})).toBeFalsy();
        expect(is_float({ 1: '1', length: 1 })).toBeFalsy();

        expect(is_float(123)).toBeFalsy();

        expect(is_float(`123`)).toBeFalsy();

        expect(is_float(true)).toBeFalsy();

        expect(is_float(Symbol())).toBeFalsy();

        expect(is_float(/a/)).toBeFalsy();

        expect(is_float(new Date())).toBeFalsy();

        expect(is_float(new Set())).toBeFalsy();

        expect(is_float(new Map())).toBeFalsy();

        expect(is_float(new Error())).toBeFalsy();
    });
});
