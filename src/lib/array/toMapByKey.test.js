import { describe, it, expect } from 'vitest';
import array_toMapByKey from './toMapByKey.js';

describe('array_toMapByKey', () => {
    it('默认单测', () => {
        const arr = [
            {
                id: 1,
                name: 'a'
            },
            {
                id: 2,
                name: 'b'
            }
        ];
        const map = array_toMapByKey(arr, 'id');
        expect(map.get(1)).toEqual({
            id: 1,
            name: 'a'
        });
        expect(map.get(2)).toEqual({
            id: 2,
            name: 'b'
        });
    });
    it('空数组', () => {
        const arr = [];
        const map = array_toMapByKey(arr, 'id');
        expect(map.size).toBe(0);
    });
    it('非数组', () => {
        const arr = 'a';
        const map = array_toMapByKey(arr, 'id');
        expect(map.size).toBe(0);
    });
    it('数组元素不是对象', () => {
        const arr = [1, 2];
        const map = array_toMapByKey(arr, 'id');
        expect(map.size).toBe(0);
    });
    it('数组元素不包含 keyName 键', () => {
        const arr = [
            {
                name: 'a'
            },
            {
                name: 'b'
            }
        ];
        const map = array_toMapByKey(arr, 'id');
        expect(map.size).toBe(0);
    });
    it('keyName 为空', () => {
        const arr = [
            {
                id: 1,
                name: 'a'
            },
            {
                id: 2,
                name: 'b'
            }
        ];
        expect(() => array_toMapByKey(arr)).toThrow('keyName is required');
    });
});
