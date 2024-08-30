import { describe, it, expect } from 'vitest';
import time_customFormat from './customFormat.js';

describe('time_customFormat', () => {
    it('should return the current date and time in default format "YYYY-MM-DD_HH-mm-ss"', () => {
        const result = time_customFormat();
        const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        expect(result).toMatch(regex);
    });

    it('should format the current date and time as "DD/MM/YYYY HH:mm:ss"', () => {
        const result = time_customFormat('DD/MM/YYYY HH:mm:ss');
        const regex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/;
        expect(result).toMatch(regex);
    });

    it('should format the current date and time as "MM-DD-YYYY"', () => {
        const result = time_customFormat('MM-DD-YYYY');
        const regex = /^\d{2}-\d{2}-\d{4}$/;
        expect(result).toMatch(regex);
    });

    it('should handle custom format "YYYY MM DD HH mm ss"', () => {
        const result = time_customFormat('YYYY MM DD HH mm ss');
        const regex = /^\d{4} \d{2} \d{2} \d{2} \d{2} \d{2}$/;
        expect(result).toMatch(regex);
    });
});
