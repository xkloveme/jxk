import { describe, expect, it } from 'vitest';
import file_formatFileSize from './formatFileSize.js';

describe('file_formatFileSize', () => {
    it('should return correct size in Bytes', () => {
        expect(file_formatFileSize(500)).toBe('500 Bytes');
        expect(file_formatFileSize(1023)).toBe('1023 Bytes');
    });

    it('should return correct size in KB', () => {
        expect(file_formatFileSize(1024)).toBe('1 KB');
        expect(file_formatFileSize(2048)).toBe('2 KB');
        expect(file_formatFileSize(10240)).toBe('10 KB');
    });

    it('should return correct size in MB', () => {
        expect(file_formatFileSize(1048576)).toBe('1 MB');
        expect(file_formatFileSize(2097152)).toBe('2 MB');
        expect(file_formatFileSize(10485760)).toBe('10 MB');
    });

    it('should return correct size in GB', () => {
        expect(file_formatFileSize(1073741824)).toBe('1 GB');
        expect(file_formatFileSize(2147483648)).toBe('2 GB');
        expect(file_formatFileSize(10737418240)).toBe('10 GB');
    });

    it('should throw an error for invalid input', () => {
        expect(() => file_formatFileSize('not a number')).toThrowError('fileSize must be a number');
        expect(() => file_formatFileSize(true)).toThrowError('fileSize must be a number');
        expect(() => file_formatFileSize(null)).toThrowError('fileSize must be a number');
    });
});
