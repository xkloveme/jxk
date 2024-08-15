import { describe, it, expect } from 'vitest';
import is_chinese from './chinese.js';

describe('is_chinese', () => {
    it('应该在给定纯中文字符串时返回true', () => {
        expect(is_chinese('中文')).toBe(true);
    });

    it('应该在给定包含非中文字符的字符串时返回false', () => {
        expect(is_chinese('abc中文123')).toBe(false);
    });

    it('应该在给定包含非中文字符的字符串且isPure为false时返回true', () => {
        expect(is_chinese('abc中文123', false)).toBe(true);
    });

    it('应该在给定空字符串时返回false', () => {
        expect(is_chinese('')).toBe(false);
    });

    it('应该在给定非字符串参数时返回false', () => {
        expect(is_chinese(null)).toBe(false);
        expect(is_chinese(undefined)).toBe(false);
        expect(is_chinese(123)).toBe(false);
        expect(is_chinese({})).toBe(false);
    });
});
