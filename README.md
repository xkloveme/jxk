<h1 align="center">jxk 函数工具库</h1>

<p align="center">
  jxk (意为： 极致、小巧、快捷) 的函数工具库，包含了常用的函数
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/jxk">
    <img src="https://img.shields.io/npm/v/jxk?color=orange&label=" alt="版本" />
  </a>
  
  <a href="https://github.com/qmhc/jxk/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/jxk" alt="许可证" />
  </a>
</p>

<h1 >
  <a href="https://jxk.jixiaokang.com/playground/index.html">
    游乐场🎠演示
  </a><br/>
  <a href="https://jxk.jixiaokang.com/">
  所有函数请访问https://jxk.jixiaokang.com/
  </a>
</h1>

**中文** | [English](./README.en.md)

## 目录

* [简介](#简介)
* [安装](#安装)
* [使用](#使用)
* [函数](#函数)
* [贡献](#贡献)
* [许可](#许可)

## 简介

`jxk`(意为： 极速、小巧、快捷) 库旨在为开发人员提供一系列便捷工具，可以在客户端和服务器端的 JavaScript 环境中使用。它包括处理对象和数组、字符串操作、类型检查等功能的常用函数。

## 安装

要使用 `jxk` ，您可以通过 npm 进行安装：

```bash
pnpm add jxk
```

```bash
yarn add jxk
```

```bash
npm i jxk
```

## 使用

安装后，您可以在项目中导入库：

```javascript
import jxk from 'jxk';

// Or if you are using a function:
import {
    sm4
} from 'jxk';
```

## 函数

所有函数请访问：[https://www.jixiaokang.com/jxk/](https://www.jixiaokang.com/jxk/)

以下是 `jxk` 库中包含的一些函数列表：

## HTML 标签处理

- **browser_decode**: HTML 标签反转义。
  - **用途**: 将 HTML 实体转换回原始字符。
  - **示例**:
    ```javascript
    browser_decode('&lt;p&gt;Hello&lt;/p&gt;'); // 返回 "<p>Hello</p>"
    ```

- **browser_encode**: HTML 标签转义。
  - **用途**: 将特殊字符转换为 HTML 实体以防止 XSS 攻击。
  - **示例**:
    ```javascript
    browser_encode('<p>Hello</p>'); // 返回 "&lt;p&gt;Hello&lt;/p&gt;"
    ```

## 加密算法

- **sm2**: SM2 国密算法，包括生成密钥对、加密、解密、签名、验签等功能。
- **sm3**: SM3 消息摘要算法。
- **sm4**: SM4 加密和解密功能。

## 时间格式化

- **time_date**: 格式化时间，参考文档为 [date-fns](https://date-fns.p6p.net/)。
- **time_format**: 格式化时间。

## 地址分析

- **analysis_address**: 省、市、区分析提取。
- **analysis_idcard**: 对身份证号解析。

## 数组处理

- **array_chunk**: 根据指定大小将数组分割成二维数组。
  - **示例**:
    ```javascript
    array_chunk([1, 2, 3, 4, 5], 2); // 返回 [[1, 2], [3, 4], [5]]
    ```

- **array_concat**: 合并数组。
  - **示例**:
    ```javascript
    array_concat([1, 2], [3, 4]); // 返回 [1, 2, 3, 4]
    ```

- **array_countOccurrences**: 统计数组中各项出现的次数。
  - **示例**:
    ```javascript
    array_countOccurrences(['apple', 'banana', 'apple', 'orange', 'banana', 'banana']);
    // 返回 { apple: 2, banana: 3, orange: 1 }
    ```

- **array_diffBoth**: 数组的差集。
- **array_diffFirst**: 取第一个数组的差集。
- **array_durstenfeldShuffle**: Durstenfeld 随机洗牌算法。
- **array_findIndex**: 查找数组中匹配的索引。
- **array_findObj**: 查找数组中匹配的值。
- **array_findParent**: 在数组中获取指定子 ID 的祖级数据。
- **array_findParent (另一个)**: 在 Tree 中获取指定子 ID 的祖级数据。
- **array_flatten**: 将多维数组拍平为一维数组。
- **array_fromTree**: 将树形结构转换为扁平化的数组。
- **array_groupBy**: 数组数据分组。
- **array_intersection**: 计算两个数组的交集。
- **array_keyBy**: 数组按 key 排序。
- **array_max**: 计算数组中的最大值。
- **array_merge**: 合并多个数组并返回它们的并集。
- **array_min**: 计算数组中的最小值。
- **array_omitBy**: 从数组中排除指定标签的项。
- **array_paging**: 对数组进行分页。
- **array_pick**: 从数组中选择指定标签的项。
- **array_randomItem**: 随机取数组中的元素。
- **array_remove**: 根据元素删除。
- **array_sattoloShuffle**: Sattolo 洗牌算法。
- **array_shuffle**: 数组随机排序（俗称洗牌）。
- **array_sort**: 排序。
- **array_sumBy**: 数组求和。
- **array_toMapByKey**: 根据某个键的值将数组转换为 Map 对象。
- **array_toTree**: 将数组转换为树形结构。
- **array_uniqWith**: 数组去重。
- **array_unique**: 数组去重。
- **array_uniqueByField**: 对象数组根据某个字段去重。

## 浏览器操作

- **browser_copyText**: 复制文本。
  - **示例**:
    ```javascript
    browser_copyText('Hello, world!');
    ```
## 贡献

欢迎贡献！请阅读 CONTRIBUTING.md 文件以了解我们的行为准则、提交拉取请求的方式等详情。

## 许可证

[MIT](./LICENSE) License © 2024 [xkloveme](https://github.com/xkloveme)
