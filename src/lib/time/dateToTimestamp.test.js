import { describe, it, expect, vi } from 'vitest';
import time_dateToTimestamp from './dateToTimestamp.js';

describe('time_dateToTimestamp', () => {
    it('should return a 10-digit timestamp for a valid date object when inMilliseconds is false', () => {
        const date = new Date('2024-01-01T00:00:00Z');
        const timestamp = time_dateToTimestamp(date, false);
        expect(timestamp).toBe(Math.floor(date.getTime() / 1000));
    });

    it('should return a 13-digit timestamp for a valid date object when inMilliseconds is true', () => {
        const date = new Date('2024-01-01T00:00:00Z');
        const timestamp = time_dateToTimestamp(date, true);
        expect(timestamp).toBe(date.getTime());
    });

    it('should return null for an invalid date object', () => {
        const date = new Date('invalid');
        const timestamp = time_dateToTimestamp(date);
        expect(timestamp).toBeNull();
    });

    it('should handle the edge case of the "zero" date correctly', () => {
        const date = new Date('0000-00-00T00:00:00Z');
        const timestamp = time_dateToTimestamp(date);
        expect(timestamp).toBeNull();
    });

    it('should return a 10-digit timestamp by default if inMilliseconds is not specified', () => {
        const date = new Date('2024-01-01T12:00:00Z');
        const timestamp = time_dateToTimestamp(date);
        expect(timestamp).toBe(Math.floor(date.getTime() / 1000));
    });

    it('should log an error to the console for an invalid date', () => {
        // Mock console.error to ensure it's called
        const consoleSpy = vi.spyOn(console, 'error');
        const date = new Date('invalid');
        time_dateToTimestamp(date);
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(consoleSpy).toHaveBeenCalledWith('Invalid Date object.');
        consoleSpy.mockRestore();
    });
});
