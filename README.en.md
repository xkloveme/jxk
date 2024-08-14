# jxk Function Utility Library

<p align="center">
  <strong>jxk (standing for: Fast, Lightweight, and Convenient)</strong> is a utility library that contains commonly used functions.
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
  <a href="https://www.jixiaokang.com/jxk/playground">
    Playground🎠Demo
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

### Object Functions

* deepClone: Creates a deep copy of an object.
* mergeObjects: Merges multiple objects into one.
* pickProperties: Picks specific properties from an object.

### Array Functions

* flattenArray: Flattens a nested array.
* chunkArray: Splits an array into chunks of a specified size.
* uniqueArray: Removes duplicates from an array.

### String Functions

capitalizeString: Capitalizes the first letter of a string.
slugify: Converts a string into a URL-friendly format.

### Type Checking

isObject: Checks if a value is an object.
isArray: Checks if a value is an array.
isString: Checks if a value is a string.

### Miscellaneous

* debounce: Debounces a function to prevent it from being called too often.
* throttle: Throttles a function to limit its execution frequency.

## Contributing

Contributions are welcome! Please read the CONTRIBUTING.md file for details on our code of conduct, how to submit pull requests, and so on.

## License

[MIT](./LICENSE) License © 2024 [xkloveme](https://github.com/xkloveme)
