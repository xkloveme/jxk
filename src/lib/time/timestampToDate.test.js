import { describe, it, expect } from 'vitest';
import time_timestampToDate from './timestampToDate.js';

describe('time_timestampToDate', () => {
    it('should return a Date object for valid 10-digit second-level timestamp', () => {
        const ts = 1704067200;
        const expectedDate = new Date(ts * 1000);
        expect(time_timestampToDate(ts)).toEqual(expectedDate);
    });

    it('should return a Date object for valid 13-digit millisecond-level timestamp', () => {
        const ts = 1704067200000;
        const expectedDate = new Date(ts);
        expect(time_timestampToDate(ts)).toEqual(expectedDate);
    });

    it('should handle string input and return a Date object for valid 10-digit second-level timestamp', () => {
        const ts = '1704067200';
        const expectedDate = new Date(parseInt(ts, 10) * 1000);
        expect(time_timestampToDate(ts)).toEqual(expectedDate);
    });

    it('should handle string input and return a Date object for valid 13-digit millisecond-level timestamp', () => {
        const ts = '1704067200000';
        const expectedDate = new Date(parseInt(ts, 10));
        expect(time_timestampToDate(ts)).toEqual(expectedDate);
    });

    it('should return null for invalid timestamp string', () => {
        expect(time_timestampToDate('invalid')).toBeNull();
    });

    it('should return null for non-numeric input', () => {
        expect(time_timestampToDate(null)).toBeNull();
        expect(time_timestampToDate(undefined)).toBeNull();
        expect(time_timestampToDate({})).toBeNull();
        expect(time_timestampToDate([])).toBeNull();
    });

    it('should return null for negative numbers', () => {
        expect(time_timestampToDate(-1234567890)).toBeNull();
    });

    it('should return null for timestamps that are neither 10 nor 13 digits long', () => {
        expect(time_timestampToDate(123)).toBeNull();
        expect(time_timestampToDate(123456789012)).toBeNull();
    });
});
