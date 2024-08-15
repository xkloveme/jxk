import { it, expect, describe } from 'vitest';
import is_date from './date.js';

describe('is_date', () => {
  it('should return true for Date objects', () => {
    expect(is_date(new Date())).toBe(true);
  });

  it('should return false for objects that are not Date', () => {
    expect(is_date({})).toBe(false);
    expect(is_date([])).toBe(false);
    expect(is_date('2024-01-01')).toBe(false); // string
    expect(is_date('2024-01-01T00:00:00Z')).toBe(false);
    expect(is_date(1)).toBe(false);
    expect(is_date(null)).toBe(false);
    expect(is_date(undefined)).toBe(false);
    expect(is_date(true)).toBe(false); // boolean
  });
});
