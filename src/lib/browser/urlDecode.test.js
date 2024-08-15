import { describe, it, expect } from 'vitest';
import browser_urlDecode from './urlDecode.js';

describe('browser_urlDecode', () => {
    it('should decode a URL format string to normal string', () => {
        const result = browser_urlDecode('https%3A%2F%2Fwww.google.com');
        expect(result).toBe('https://www.google.com');
    });

    it('should throw a TypeError and return null if input is not a string', () => {
        const result = browser_urlDecode(123);
        expect(result).toBeNull();
    });

    it('should return null if an error occurs', () => {
        const result = browser_urlDecode(null);
        expect(result).toBeNull();
    });
});
