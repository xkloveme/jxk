import { it, expect, describe } from 'vitest';
import string_countCharacters from './countCharacters.js';

describe('string_countCharacters', () => {
    it('should correctly return counts for each characters in a string', () => {
        const result = string_countCharacters('hello');
        expect(result).toEqual({ h: 1, e: 1, l: 2, o: 1 });
    });

    it('should handle a string with numbers', () => {
        const result = string_countCharacters('hello42');
        expect(result).toEqual({ h: 1, e: 1, l: 2, o: 1, 4: 1, 2: 1 });
    });

    it('should handle a string with special characters', () => {
        const result = string_countCharacters('hello!@');
        expect(result).toEqual({ h: 1, e: 1, l: 2, o: 1, '!': 1, '@': 1 });
    });

    it('should handle an empty string', () => {
        const result = string_countCharacters('');
        expect(result).toEqual({});
    });
});
