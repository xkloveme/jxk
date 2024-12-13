# jxk Function Utility Library

<p align="center">
  <strong>jxk (meaning: extreme, small, fast) </strong> zero-dependency function library, including commonly used functions
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/jxk">
    <img src="https://img.shields.io/npm/v/jxk?color=orange&label=" alt="version" />
  </a>
  <a href="https://github.com/qmhc/jxk/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/jxk" alt="license" />
  </a>
</p>

<h1 >
  <a href="https://jxk.jixiaokang.com/playground/index.html">
    Playground🎠Demo
  </a><br/>
  <a href="https://jxk.jixiaokang.com/">
  Function Library https://jxk.jixiaokang.com/
  </a>
</h1>

**English** | [中文](./README.md)

## Table of Contents

* [Introduction](#introduction)
* [Installation](#installation)
* [Usage](#usage)
* [Functions](#functions)
* [Contributing](#contributing)
* [License](#license)

## Introduction

The `jxk` library aims to provide developers with a set of handy tools that can be used in both client-side and server-side JavaScript environments. It includes functions for common tasks such as manipulating objects and arrays, string handling, type checking, and more.

## Installation

To use `jxk` , you can install it via npm:

```bash
pnpm add jxk
```

```bash
yarn add jxk
```

```bash
npm i jxk
```

## Usage

Once installed, you can import the library in your project:

```javascript
import jxk from 'jxk';

// Or if you are using a function:
import {
    sm4
} from 'jxk';
```

## Functions

For all functions, please visit: [https://www.jixiaokang.com/jxk/](https://www.jixiaokang.com/jxk/)

Here is a list of some of the functions included in the `jxk` library:

## HTML Tag Handling

- **browser_decode**: Unescape HTML entities.
  - **Purpose**: Converts HTML entities back to their original characters.
  - **Example**:
    ```javascript
    browser_decode('&lt;p&gt;Hello&lt;/p&gt;'); // Returns "<p>Hello</p>"
    ```

- **browser_encode**: Escape HTML entities.
  - **Purpose**: Converts special characters to HTML entities to prevent XSS attacks.
  - **Example**:
    ```javascript
    browser_encode('<p>Hello</p>'); // Returns "&lt;p&gt;Hello&lt;/p&gt;"
    ```

## Encryption Algorithms

- **sm2**: SM2 cryptographic algorithm, including key pair generation, encryption, decryption, signing, and verification.
- **sm3**: SM3 message digest algorithm.
- **sm4**: SM4 encryption and decryption.

## Time Formatting

- **time_date**: Format dates, see documentation at [date-fns](https://date-fns.p6p.net/).
- **time_format**: Format time.

## Address Analysis

- **analysis_address**: Province, city, and district analysis extraction.
- **analysis_idcard**: ID card number parsing.

## Array Processing

- **array_chunk**: Split an array into chunks of a specified size.
  - **Example**:
    ```javascript
    array_chunk([1, 2, 3, 4, 5], 2); // Returns [[1, 2], [3, 4], [5]]
    ```

- **array_concat**: Concatenate arrays.
  - **Example**:
    ```javascript
    array_concat([1, 2], [3, 4]); // Returns [1, 2, 3, 4]
    ```

- **array_countOccurrences**: Count occurrences of each item in an array.
  - **Example**:
    ```javascript
    array_countOccurrences(['apple', 'banana', 'apple', 'orange', 'banana', 'banana']);
    // Returns { apple: 2, banana: 3, orange: 1 }
    ```

- **array_diffBoth**: Difference between two arrays.
- **array_diffFirst**: Difference of the first array.
- **array_durstenfeldShuffle**: Durstenfeld shuffle algorithm.
- **array_findIndex**: Find index of matching item in an array.
- **array_findObj**: Find matching object in an array.
- **array_findParent**: Find the parent(s) of a specified child ID in an array.
- **array_findParent (another)**: Find the parent(s) of a specified child ID in a tree structure.
- **array_flatten**: Flatten a multidimensional array into a one-dimensional array.
- **array_fromTree**: Convert a tree structure to a flattened array.
- **array_groupBy**: Group array data.
- **array_intersection**: Compute the intersection of two arrays.
- **array_keyBy**: Sort array by key.
- **array_max**: Compute the maximum value in an array.
- **array_merge**: Merge multiple arrays and return their union.
- **array_min**: Compute the minimum value in an array.
- **array_omitBy**: Exclude items with specific keys from an array.
- **array_paging**: Paginate an array.
- **array_pick**: Pick items with specific keys from an array.
- **array_randomItem**: Randomly select an item from an array.
- **array_remove**: Remove items based on elements.
- **array_sattoloShuffle**: Sattolo shuffle algorithm.
- **array_shuffle**: Shuffle an array randomly.
- **array_sort**: Sort an array.
- **array_sumBy**: Sum values in an array.
- **array_toMapByKey**: Convert an array to a Map object based on a key.
- **array_toTree**: Convert an array to a tree structure.
- **array_uniqWith**: Deduplicate an array.
- **array_unique**: Deduplicate an array.
- **array_uniqueByField**: Deduplicate an object array by a specific field.

## Browser Operations

- **browser_copyText**: Copy text.
  - **Example**:
    ```javascript
    browser_copyText('Hello, world!');
    ```

### Miscellaneous

* debounce: Debounces a function to prevent it from being called too often.
* throttle: Throttles a function to limit its execution frequency.

## Contributing

Contributions are welcome! Please read the CONTRIBUTING.md file for details on our code of conduct, how to submit pull requests, and so on.

## License

[MIT](./LICENSE) License © 2024 [xkloveme](https://github.com/xkloveme)
