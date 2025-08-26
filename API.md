# jxk API 参考文档

## 目录
1. [快速开始](#快速开始)
2. [数组处理 API](#数组处理-api)
3. [字符串处理 API](#字符串处理-api)
4. [时间处理 API](#时间处理-api)
5. [浏览器工具 API](#浏览器工具-api)
6. [类型检查 API](#类型检查-api)
7. [数据脱敏 API](#数据脱敏-api)
8. [国密算法 API](#国密算法-api)
9. [文件处理 API](#文件处理-api)
10. [数字处理 API](#数字处理-api)
11. [正则表达式 API](#正则表达式-api)
12. [杂项工具 API](#杂项工具-api)
13. [数据分析 API](#数据分析-api)

## 快速开始

### 安装
```bash
npm install jxk
# 或
yarn add jxk
# 或
pnpm add jxk
```

### 导入方式

#### ES6 模块导入
```javascript
// 按需导入
import { chunk, sm2, copyText } from 'jxk'

// 全量导入
import jxk from 'jxk'
```

#### CommonJS 导入
```javascript
const { chunk, sm2, copyText } = require('jxk')
```

## 数组处理 API

### `chunk(array, size, origin = true)`
将数组分割为指定大小的块。

**参数:**
- `array` (Array): 要分割的数组
- `size` (Number): 每个块的大小
- `origin` (Boolean, 可选): 剩余元素是否组成一个区块，默认 `true`

**返回值:**
- (Array[]): 分割后的二维数组

**示例:**
```javascript
import { chunk } from 'jxk'

chunk(['a', 'b', 'c', 'd'], 2)
// => [['a', 'b'], ['c', 'd']]

chunk(['a', 'b', 'c', 'd'], 3)
// => [['a', 'b', 'c'], ['d']]

chunk(['a', 'b', 'c', 'd', 'e'], 3, false)
// => [['a', 'b', 'c']]
```

### `concat(...arrays)`
合并多个数组。

**参数:**
- `...arrays` (Array[]): 要合并的数组

**返回值:**
- (Array): 合并后的数组

**示例:**
```javascript
import { concat } from 'jxk'

concat([1, 2], [3, 4], [5, 6])
// => [1, 2, 3, 4, 5, 6]
```

### `unique(array)`
数组去重（严格相等）。

**参数:**
- `array` (Array): 要去重的数组

**返回值:**
- (Array): 去重后的数组

**示例:**
```javascript
import { unique } from 'jxk'

unique([1, 2, 2, 3, 3, 4])
// => [1, 2, 3, 4]
```

### `uniqueByField(array, field)`
对象数组根据某个字段去重。

**参数:**
- `array` (Array): 对象数组
- `field` (String): 去重依据的字段名

**返回值:**
- (Array): 去重后的数组

**示例:**
```javascript
import { uniqueByField } from 'jxk'

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice' }
]

uniqueByField(users, 'id')
// => [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

### `toTree(array, config)`
将扁平数组转换为树形结构。

**参数:**
- `array` (Array): 扁平数组
- `config` (Object): 配置项
  - `id` (String): ID 字段名，默认 'id'
  - `parentId` (String): 父节点 ID 字段名，默认 'parentId'
  - `children` (String): 子节点字段名，默认 'children'

**返回值:**
- (Array): 树形结构数组

**示例:**
```javascript
import { toTree } from 'jxk'

const flatData = [
  { id: 1, name: '根节点', parentId: null },
  { id: 2, name: '子节点1', parentId: 1 },
  { id: 3, name: '子节点2', parentId: 1 }
]

toTree(flatData)
// => [{ id: 1, name: '根节点', children: [...] }]
```

### `fromTree(tree)`
将树形结构展平为数组。

**参数:**
- `tree` (Array): 树形结构数组

**返回值:**
- (Array): 扁平化数组

### `sort(array, compareFn)`
数组排序。

**参数:**
- `array` (Array): 要排序的数组
- `compareFn` (Function): 比较函数

**返回值:**
- (Array): 排序后的数组

### 更多数组函数
- `flatten(array, depth)` - 数组扁平化
- `groupBy(array, key)` - 数组分组
- `intersection(array1, array2)` - 数组交集
- `max(array)` - 数组最大值
- `min(array)` - 数组最小值
- `shuffle(array)` - 数组随机排序
- `randomItem(array)` - 随机取数组元素

## 字符串处理 API

### `camelCase(value, delimiter = '/')`
字符串转小驼峰风格。

**参数:**
- `value` (String): 字符串数据
- `delimiter` (String): 分隔符，默认 '/'

**返回值:**
- (String): 小驼峰风格的字符串

**示例:**
```javascript
import { camelCase } from 'jxk'

camelCase('hello-world')
// => 'helloWorld'

camelCase('user_name')
// => 'userName'
```

### 更多字符串函数
- `capitalize(str)` - 首字母大写
- `kebabCase(str)` - 转短横线命名
- `snakeCase(str)` - 转下划线命名
- `truncate(str, length)` - 字符串截取
- `padStart(str, length, fillStr)` - 字符串前填充
- `randomString(length, chars)` - 随机字符串生成

## 时间处理 API

### `format(date, pattern)`
格式化时间（基于 date-fns）。

**参数:**
- `date` (Date): 日期对象
- `pattern` (String): 格式化模式

**返回值:**
- (String): 格式化后的时间字符串

**示例:**
```javascript
import { format } from 'jxk'

const now = new Date()
format(now, 'yyyy-MM-dd HH:mm:ss')
// => '2024-08-16 15:30:45'
```

### 更多时间函数
- `addDays(date, days)` - 日期加减
- `diffDays(date1, date2)` - 计算日期差
- `isValid(date)` - 日期有效性检查
- `parse(dateString, pattern)` - 日期解析
- `startOfDay(date)` - 获取一天的开始
- `endOfDay(date)` - 获取一天的结束

## 浏览器工具 API

### `copyText(text)`
复制文本到剪贴板。

**参数:**
- `text` (String): 要复制的文本

**返回值:**
- (Promise<Boolean>): 是否复制成功

**示例:**
```javascript
import { copyText } from 'jxk'

await copyText('Hello, World!')
// => true (复制成功)
```

### `getQueryParams(url)`
解析 URL 查询参数。

**参数:**
- `url` (String, 可选): URL 字符串，默认当前页面

**返回值:**
- (Object): 参数对象

**示例:**
```javascript
import { getQueryParams } from 'jxk'

getQueryParams('https://example.com?name=john&age=30')
// => { name: 'john', age: '30' }
```

### 更多浏览器函数
- `openFullscreen(element)` - 打开全屏
- `exitFullScreen()` - 退出全屏
- `openWindow(url, options)` - 打开新窗口
- `openPrint()` - 打开打印对话框
- `urlEncode(str)` - URL 编码
- `urlDecode(str)` - URL 解码

## 类型检查 API

### `isString(value)`
检查值是否为字符串。

**参数:**
- `value` (Any): 要检查的值

**返回值:**
- (Boolean): 是否为字符串

**示例:**
```javascript
import { isString } from 'jxk'

isString('hello')  // => true
isString(123)      // => false
```

### `isEmail(value)`
检查字符串是否为有效邮箱格式。

**参数:**
- `value` (String): 要检查的字符串

**返回值:**
- (Boolean): 是否为有效邮箱

**示例:**
```javascript
import { isEmail } from 'jxk'

isEmail('user@example.com')  // => true
isEmail('invalid-email')     // => false
```

### 更多类型检查函数
- `isNumber(value)` - 数字检查
- `isArray(value)` - 数组检查
- `isObject(value)` - 对象检查
- `isFunction(value)` - 函数检查
- `isPhone(value)` - 手机号检查
- `isIdCard(value)` - 身份证号检查
- `isUrl(value)` - URL 格式检查

## 数据脱敏 API

### `maskPhone(phone)`
手机号脱敏。

**参数:**
- `phone` (String): 手机号

**返回值:**
- (String): 脱敏后的手机号

**示例:**
```javascript
import { maskPhone } from 'jxk'

maskPhone('13812345678')
// => '138****5678'
```

### 更多脱敏函数
- `maskEmail(email)` - 邮箱脱敏
- `maskIdCard(idCard)` - 身份证脱敏
- `maskBankCard(bankCard)` - 银行卡脱敏
- `maskName(name)` - 姓名脱敏

## 国密算法 API

### SM2 椭圆曲线算法

#### `sm2.generateKeyPairHex(privateKey?)`
生成 SM2 密钥对。

**参数:**
- `privateKey` (String, 可选): 自定义私钥

**返回值:**
- (Object): 包含公钥和私钥的对象
  - `publicKey` (String): 公钥（130位十六进制）
  - `privateKey` (String): 私钥（64位十六进制）

**示例:**
```javascript
import { sm2 } from 'jxk'

const keyPair = sm2.generateKeyPairHex()
console.log(keyPair.publicKey)   // 公钥
console.log(keyPair.privateKey)  // 私钥
```

#### `sm2.doEncrypt(data, publicKey, cipherMode?, options?)`
SM2 加密。

**参数:**
- `data` (String|Array): 要加密的数据
- `publicKey` (String): 公钥
- `cipherMode` (Number, 可选): 密文模式（1: C1C3C2, 0: C1C2C3），默认 1
- `options` (Object, 可选): 选项
  - `asn1` (Boolean): 是否使用 ASN.1 编码，默认 false

**返回值:**
- (String): 加密后的十六进制字符串

**示例:**
```javascript
import { sm2 } from 'jxk'

const keyPair = sm2.generateKeyPairHex()
const encrypted = sm2.doEncrypt('Hello, SM2!', keyPair.publicKey)
console.log(encrypted) // 加密结果
```

#### `sm2.doDecrypt(encryptData, privateKey, cipherMode?, options?)`
SM2 解密。

**参数:**
- `encryptData` (String): 加密的数据
- `privateKey` (String): 私钥
- `cipherMode` (Number, 可选): 密文模式，默认 1
- `options` (Object, 可选): 选项
  - `asn1` (Boolean): 是否使用 ASN.1 解码
  - `output` (String): 输出格式（'string' | 'array'）

**返回值:**
- (String|Array): 解密后的数据

#### `sm2.doSignature(msg, privateKey, options?)`
SM2 数字签名。

**参数:**
- `msg` (String): 要签名的消息
- `privateKey` (String): 私钥
- `options` (Object, 可选): 签名选项
  - `hash` (Boolean): 是否使用 SM3 哈希
  - `der` (Boolean): 是否使用 DER 编码
  - `publicKey` (String): 公钥（可提升性能）
  - `userId` (String): 用户ID

**返回值:**
- (String): 签名结果

#### `sm2.doVerifySignature(msg, signature, publicKey, options?)`
SM2 签名验证。

**参数:**
- `msg` (String): 原始消息
- `signature` (String): 签名值
- `publicKey` (String): 公钥
- `options` (Object, 可选): 验证选项

**返回值:**
- (Boolean): 验证结果

### SM3 哈希算法

#### `sm3(data, options?)`
SM3 消息摘要计算。

**参数:**
- `data` (String|Buffer): 需要计算哈希的数据
- `options` (Object, 可选): 哈希计算选项
  - `encoding` (String): 输出编码格式，默认 'hex'

**返回值:**
- (String): SM3 哈希值

**示例:**
```javascript
import { sm3 } from 'jxk'

const hash = sm3('Hello, World!')
console.log(hash) // 输出 SM3 哈希值
```

### SM4 对称加密算法

#### `sm4.encrypt(plaintext, key, options?)`
SM4 加密。

**参数:**
- `plaintext` (String): 明文
- `key` (String): 128位密钥（32个十六进制字符）
- `options` (Object, 可选): 加密选项
  - `mode` (String): 加密模式（'ecb' | 'cbc'），默认 'ecb'
  - `output` (String): 输出格式（'hex' | 'base64'），默认 'hex'
  - `padding` (String): 填充方式，默认 'pkcs7'

**返回值:**
- (String): 加密后的数据

**示例:**
```javascript
import { sm4 } from 'jxk'

const key = '0123456789abcdeffedcba9876543210'
const encrypted = sm4.encrypt('Hello, SM4!', key)
console.log(encrypted) // 十六进制密文
```

#### `sm4.decrypt(ciphertext, key, options?)`
SM4 解密。

**参数:**
- `ciphertext` (String): 密文
- `key` (String): 128位密钥
- `options` (Object, 可选): 解密选项

**返回值:**
- (String): 解密后的明文

## 文件处理 API

### `formatFileSize(bytes, decimals = 2)`
格式化文件大小。

**参数:**
- `bytes` (Number): 字节数
- `decimals` (Number): 小数位数，默认 2

**返回值:**
- (String): 格式化后的文件大小

**示例:**
```javascript
import { formatFileSize } from 'jxk'

formatFileSize(1024)       // => '1.00 KB'
formatFileSize(1048576)    // => '1.00 MB'
formatFileSize(1073741824) // => '1.00 GB'
```

### 更多文件函数
- `fileToDataURL(file)` - 文件转 Data URL
- `dataURLtoFile(dataURL, filename)` - Data URL 转文件
- `fileInfo(file)` - 获取文件信息

## 数字处理 API

### `random(min, max)`
生成指定范围的随机数。

**参数:**
- `min` (Number): 最小值
- `max` (Number): 最大值

**返回值:**
- (Number): 随机数

### 更多数字函数
- `round(number, precision)` - 数字四舍五入
- `ceil(number, precision)` - 数字向上取整
- `floor(number, precision)` - 数字向下取整
- `clamp(number, min, max)` - 数字限制在范围内

## 正则表达式 API

### 预定义正则表达式
- `phone` - 手机号正则
- `idcard` - 身份证号正则
- `businessLicense` - 营业执照正则
- `licencePlateNumber` - 车牌号正则
- `trainNumber` - 火车车次正则

**示例:**
```javascript
import { phone } from 'jxk'

phone.test('13812345678') // => true
```

## 杂项工具 API

### `debounce(func, wait, immediate?)`
函数防抖。

**参数:**
- `func` (Function): 要防抖的函数
- `wait` (Number): 延迟时间（毫秒）
- `immediate` (Boolean): 是否立即执行

**返回值:**
- (Function): 防抖后的函数

**示例:**
```javascript
import { debounce } from 'jxk'

const debouncedFn = debounce(() => {
  console.log('执行')
}, 300)

// 连续调用只会在最后一次调用后的 300ms 执行
debouncedFn()
debouncedFn()
debouncedFn()
```

### `throttle(func, wait)`
函数节流。

**参数:**
- `func` (Function): 要节流的函数
- `wait` (Number): 节流间隔（毫秒）

**返回值:**
- (Function): 节流后的函数

### 更多杂项函数
- `deepClone(obj)` - 深拷贝
- `delay(ms)` - 延迟执行
- `download(url, filename)` - 下载文件
- `chain(value)` - 链式调用

## 数据分析 API

### `address(addressString)`
地址解析，提取省市区信息。

**参数:**
- `addressString` (String): 地址字符串

**返回值:**
- (Object): 解析后的地址信息
  - `province` (String): 省份
  - `city` (String): 城市
  - `district` (String): 区/县

**示例:**
```javascript
import { address } from 'jxk'

address('北京市朝阳区建国路1号')
// => { province: '北京市', city: '北京市', district: '朝阳区' }
```

### `idcard(idCardNumber)`
身份证号解析。

**参数:**
- `idCardNumber` (String): 身份证号

**返回值:**
- (Object): 解析后的信息
  - `birthdate` (String): 出生日期
  - `gender` (String): 性别
  - `region` (String): 地区代码

## 错误处理

所有函数都包含适当的错误处理机制：

### 参数验证
```javascript
// 大多数函数会验证参数类型和有效性
try {
  const result = chunk(null, 2) // 会抛出错误
} catch (error) {
  console.error(error.message) // "参数 array 必须是数组类型"
}
```

### 异步函数错误处理
```javascript
// 异步函数使用 Promise 形式的错误处理
try {
  const success = await copyText('text')
  if (!success) {
    console.log('复制失败')
  }
} catch (error) {
  console.error('复制过程中发生错误:', error)
}
```

## 性能说明

### 推荐的使用方式
1. **按需导入**: 只导入需要的函数以减少包体积
2. **缓存结果**: 对于计算密集型函数，考虑缓存结果
3. **批量操作**: 尽量使用批量操作函数而不是循环调用

### 性能基准
- **数组操作**: 大多数数组函数在处理万级数据时性能良好
- **字符串操作**: 字符串函数针对常见长度进行了优化
- **加密算法**: SM2/SM3/SM4 算法性能符合工业标准

## 浏览器兼容性

### 支持的环境
- **现代浏览器**: Chrome 60+, Firefox 55+, Safari 12+
- **Node.js**: 12.0+
- **移动端**: iOS Safari 12+, Android Chrome 60+

### 兼容性说明
- 部分浏览器 API（如 `navigator.clipboard`）在旧版本中可能不可用
- 提供了降级方案以确保基本功能正常工作

## 版本更新

### 语义化版本控制
项目遵循语义化版本控制 (Semantic Versioning)：
- `MAJOR.MINOR.PATCH`
- 主版本号：不兼容的 API 修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正

### 迁移指南
当有破坏性变更时，会在 CHANGELOG.md 中提供详细的迁移指南。

---

更多详细信息和最新更新，请访问：
- **官方文档**: https://jxk.jixiaokang.com/
- **在线演示**: https://jxk.jixiaokang.com/playground/
- **GitHub 仓库**: https://github.com/xkloveme/jxk