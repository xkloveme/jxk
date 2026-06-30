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
  
  <a href="https://codecov.io/gh/xkloveme/jxk">
    <img src="https://codecov.io/gh/xkloveme/jxk/branch/main/graph/badge.svg" alt="覆盖率" />
  </a>
  
  <a href="https://github.com/xkloveme/jxk/actions">
    <img src="https://github.com/xkloveme/jxk/workflows/CI/badge.svg" alt="构建状态" />
  </a>
</p>

<h1 align="center">
  <a href="https://jxk.jixiaokang.com/playground/index.html">
    🎠 在线演示
  </a>
  ·
  <a href="https://jxk.jixiaokang.com/">
    📚 完整文档
  </a>
  ·
  <a href="./API.md">
    📖 API 参考
  </a>
</h1>

**中文** | [English](./README.en.md)

## 🚀 特性

- **🔒 零依赖**: 完全原生实现，无需引入任何第三方依赖
- **📦 模块化**: 按功能分类组织，支持按需引入，减少包体积
- **🛡️ 国密算法**: 集成 SM2、SM3、SM4 国家密码标准算法
- **📝 TypeScript**: 提供完整的类型定义文件
- **⚡ 高性能**: 注重运行效率和内存占用优化
- **🧪 高质量**: 完善的单元测试，测试覆盖率 > 90%
- **📖 文档完善**: 详细的 JSDoc 注释和使用示例

## 📋 目录

* [安装](#安装)
* [快速开始](#快速开始)
* [核心功能](#核心功能)
* [国密算法](#国密算法)
* [文档](#文档)
* [贡献](#贡献)
* [许可证](#许可证)

## 📦 安装

```bash
# 使用 pnpm (推荐)
pnpm add jxk

# 使用 yarn
yarn add jxk

# 使用 npm
npm install jxk
```

## 🎯 快速开始

### ES6 模块导入
```javascript
// 按需导入（推荐，支持 Tree Shaking）
import { chunk, sm2, copyText, format } from 'jxk'

// 全量导入
import jxk from 'jxk'
```

### CommonJS 导入
```javascript
const { chunk, sm2, copyText } = require('jxk')
```

### 基础使用示例
```javascript
import { chunk, camelCase, sm3, copyText } from 'jxk'

// 数组分块
const chunks = chunk([1, 2, 3, 4, 5], 2)
console.log(chunks) // [[1, 2], [3, 4], [5]]

// 字符串转驼峰
const camelStr = camelCase('hello-world')
console.log(camelStr) // 'helloWorld'

// 国密 SM3 哈希
const hash = sm3('Hello, World!')
console.log(hash) // SM3 哈希值

// 复制文本到剪贴板（浏览器环境）
await copyText('复制的内容')
```

## 🎨 核心功能

### 🔢 数组处理
强大的数组操作函数集合：

```javascript
import { 
  chunk,      // 数组分块
  unique,     // 数组去重
  toTree,     // 转换为树结构
  shuffle,    // 随机排序
  groupBy     // 分组
} from 'jxk'

// 数组分块
chunk(['a', 'b', 'c', 'd'], 2)  // [['a', 'b'], ['c', 'd']]

// 数组去重
unique([1, 2, 2, 3, 3, 4])      // [1, 2, 3, 4]

// 扁平数据转树结构
const flatData = [
  { id: 1, name: '根节点', parentId: null },
  { id: 2, name: '子节点', parentId: 1 }
]
toTree(flatData)  // 树形结构
```

### 🔤 字符串处理
丰富的字符串操作工具：

```javascript
import { 
  camelCase,    // 驼峰命名
  kebabCase,    // 短横线命名
  truncate,     // 字符串截取
  randomString  // 随机字符串
} from 'jxk'

camelCase('hello-world')         // 'helloWorld'
kebabCase('helloWorld')          // 'hello-world'
truncate('很长的字符串', 5)        // '很长的字...'
randomString(8)                  // 'aB3kL9mN'
```

### 🕐 时间处理
基于 date-fns 的时间格式化：

```javascript
import { format, addDays, diffDays } from 'jxk'

const now = new Date()
format(now, 'yyyy-MM-dd HH:mm:ss')  // '2024-08-16 15:30:45'
addDays(now, 7)                     // 7天后的日期
diffDays(date1, date2)              // 计算日期差
```

### 🌐 浏览器工具
浏览器环境的实用功能：

```javascript
import { 
  copyText,       // 复制文本
  getQueryParams, // 获取URL参数
  openFullscreen, // 全屏控制
  urlEncode       // URL编码
} from 'jxk'

// 复制文本到剪贴板
await copyText('Hello, World!')

// 解析URL参数
getQueryParams('?name=john&age=30')  // { name: 'john', age: '30' }

// 打开全屏
openFullscreen(document.body)
```

### ✅ 类型检查
全面的 JavaScript 类型检查：

```javascript
import { 
  isString, isNumber, isArray,
  isEmail, isPhone, isIdCard 
} from 'jxk'

isString('hello')              // true
isEmail('user@example.com')    // true
isPhone('13812345678')         // true
isIdCard('身份证号')           // true/false
```

### 🎭 数据脱敏
保护敏感信息的脱敏工具：

```javascript
import { maskPhone, maskEmail, maskIdCard } from 'jxk'

maskPhone('13812345678')        // '138****5678'
maskEmail('user@example.com')   // 'u***@example.com'
maskIdCard('身份证号')          // '3301**********1234'
```

## 🛡️ 国密算法

符合国家标准的密码算法实现：

### SM2 椭圆曲线算法
```javascript
import { sm2 } from 'jxk'

// 生成密钥对
const keyPair = sm2.generateKeyPairHex()
console.log(keyPair.publicKey)   // 公钥
console.log(keyPair.privateKey)  // 私钥

// 加密解密
const plaintext = 'Hello, SM2!'
const encrypted = sm2.doEncrypt(plaintext, keyPair.publicKey)
const decrypted = sm2.doDecrypt(encrypted, keyPair.privateKey)
console.log(decrypted)  // 'Hello, SM2!'

// 数字签名
const signature = sm2.doSignature(plaintext, keyPair.privateKey)
const isValid = sm2.doVerifySignature(plaintext, signature, keyPair.publicKey)
console.log(isValid)  // true
```

### SM3 哈希算法
```javascript
import { sm3 } from 'jxk'

const hash = sm3('Hello, World!')
console.log(hash)  // SM3 哈希值
```

### SM4 对称加密
```javascript
import { sm4 } from 'jxk'

const key = '0123456789abcdeffedcba9876543210'
const plaintext = 'Hello, SM4!'

const encrypted = sm4.encrypt(plaintext, key)
const decrypted = sm4.decrypt(encrypted, key)
console.log(decrypted)  // 'Hello, SM4!'
```

## 📚 文档

### 📖 核心文档
- **[API 参考文档](./API.md)** - 完整的 API 文档和使用示例
- **[架构设计文档](./ARCHITECTURE.md)** - 项目架构和设计原理
- **[贡献指南](./CONTRIBUTING.md)** - 如何参与项目开发
- **[测试文档](./TESTING.md)** - 测试策略和最佳实践

### 🌐 在线资源
- **[官方文档站点](https://jxk.jixiaokang.com/)** - 完整的在线文档
- **[在线演示环境](https://jxk.jixiaokang.com/playground/)** - 在线试用和测试
- **[GitHub 仓库](https://github.com/xkloveme/jxk)** - 源代码和问题反馈

### 📝 函数列表

#### 数组处理 (array)
- `chunk` - 数组分块
- `concat` - 数组合并
- `unique` - 数组去重
- `sort` - 数组排序
- `toTree` - 转换为树结构
- `fromTree` - 树结构展平
- `shuffle` - 随机排序
- `groupBy` - 数组分组
- `intersection` - 数组交集
- `max/min` - 最大/最小值

#### 字符串处理 (string)
- `camelCase` - 驼峰命名转换
- `kebabCase` - 短横线命名
- `snakeCase` - 下划线命名
- `capitalize` - 首字母大写
- `truncate` - 字符串截取
- `randomString` - 随机字符串

#### 时间处理 (time)
- `format` - 时间格式化
- `addDays/subDays` - 日期加减
- `diffDays` - 日期差计算
- `isValid` - 日期有效性
- `startOfDay/endOfDay` - 日期边界

#### 浏览器工具 (browser)
- `copyText` - 复制文本
- `getQueryParams` - URL参数解析
- `openFullscreen/exitFullScreen` - 全屏控制
- `urlEncode/urlDecode` - URL编码
- `openWindow` - 窗口管理

#### 类型检查 (is)
- `isString/isNumber/isArray` - 基础类型
- `isEmail/isPhone/isUrl` - 格式验证
- `isIdCard` - 身份证验证
- `isEmpty/isNull` - 空值检查

#### 国密算法 (sm)
- `sm2` - 椭圆曲线公钥算法
- `sm3` - 哈希摘要算法
- `sm4` - 对称加密算法

#### 杂项工具 (misc)
- `debounce/throttle` - 防抖节流
- `deepClone` - 深拷贝
- `delay` - 延迟执行
- `download` - 文件下载

## 🧪 测试

项目具有完善的测试体系：

```bash
# 运行测试
npm test

# 生成覆盖率报告
npm run test:coverage

# 监听模式
npm run test:watch
```

**测试覆盖率目标**:
- 语句覆盖率: > 90%
- 分支覆盖率: > 85%
- 函数覆盖率: > 95%
- 行覆盖率: > 90%

## 🔧 开发

### 环境要求
- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 开发命令
```bash
# 安装依赖
pnpm install

# 启动开发服务器
npm run dev

# 构建项目
npm run build

# 生成文档
npm run docs

# 代码检查
npm run lint
```
## 贡献

欢迎贡献！请阅读 CONTRIBUTING.md 文件以了解我们的行为准则、提交拉取请求的方式等详情。

## 许可证

[MIT](./LICENSE) License © 2024 [xkloveme](https://github.com/xkloveme)
