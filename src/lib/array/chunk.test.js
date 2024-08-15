import { describe, it, expect } from 'vitest';
import array_chunk from './chunk.js';

describe('array_chunk', () => {
    it('it shoule return a array', () => {
        const arr = ['a', 'b', 'c', 'd', 'e'];
        const new_arr = array_chunk(arr, 3);
        expect(new_arr).toEqual([
            ['a', 'b', 'c'],
            ['d', 'e']
        ]);
        const new_arr1 = array_chunk(arr, 3, false);
        expect(new_arr1).toEqual([['a', 'b', 'c']]);
    });
});
