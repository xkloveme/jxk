# jxk 测试文档

## 目录
1. [测试概述](#测试概述)
2. [测试框架和工具](#测试框架和工具)
3. [测试策略](#测试策略)
4. [单元测试指南](#单元测试指南)
5. [测试覆盖率](#测试覆盖率)
6. [测试最佳实践](#测试最佳实践)

## 测试概述

### 测试目标
- **功能正确性**: 所有函数按预期工作
- **边界安全性**: 正确处理边界条件和异常情况
- **性能稳定性**: 关键算法性能符合要求
- **向后兼容性**: API 变更不破坏现有功能

### 测试原则
1. **测试驱动开发 (TDD)**: 先写测试，再实现功能
2. **覆盖率优先**: 追求高测试覆盖率
3. **快速反馈**: 测试运行速度快，反馈及时
4. **独立性**: 测试之间相互独立

## 测试框架和工具

### Vitest 框架
项目使用 Vitest 作为主要测试框架：

```javascript
import { describe, it, expect, beforeEach } from 'vitest'

describe('模块名称', () => {
  beforeEach(() => {
    // 每个测试前的准备工作
  })
  
  it('应该正确处理正常情况', () => {
    // 测试实现
  })
})
```

### 配置文件
```javascript
// vitest.config.js
export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8',
      threshold: {
        global: {
          statements: 90,
          branches: 85,
          functions: 95,
          lines: 90
        }
      }
    }
  }
})
```

## 测试策略

### 测试分层
项目采用三层测试策略：

- **单元测试 (80%)**: 测试单个函数或方法
- **集成测试 (15%)**: 测试模块间的交互  
- **E2E 测试 (5%)**: 测试完整的使用场景

### 运行测试
```bash
# 运行所有测试
npm test

# 监听模式
npm run test:watch

# 生成覆盖率报告
npm run test:coverage
```

## 单元测试指南

### 标准测试模板
```javascript
import { describe, it, expect } from 'vitest'
import functionName from './functionName.js'

describe('functionName', () => {
  describe('基本功能', () => {
    it('应该正确处理有效输入', () => {
      const result = functionName('valid input')
      expect(result).toBe('expected result')
    })
    
    it('应该正确处理空值', () => {
      const result = functionName('')
      expect(result).toBe('')
    })
  })
  
  describe('边界情况', () => {
    it('应该处理 null 和 undefined', () => {
      expect(functionName(null)).toBeNull()
      expect(functionName(undefined)).toBeUndefined()
    })
  })
  
  describe('错误处理', () => {
    it('应该抛出适当的错误', () => {
      expect(() => functionName('invalid'))
        .toThrow('Error message')
    })
  })
})
```

### 数组函数测试示例
```javascript
describe('chunk function', () => {
  it('应该正确分割数组', () => {
    expect(chunk([1,2,3,4], 2)).toEqual([[1,2], [3,4]])
  })
  
  it('应该处理余数情况', () => {
    expect(chunk([1,2,3,4,5], 2)).toEqual([[1,2], [3,4], [5]])
  })
  
  it('应该处理空数组', () => {
    expect(chunk([], 2)).toEqual([])
  })
  
  it('应该处理无效的 size', () => {
    expect(chunk([1,2,3], 0)).toEqual([])
  })
})
```

### 国密算法测试示例
```javascript
describe('SM2 加密算法', () => {
  it('应该正确加密和解密', () => {
    const keyPair = sm2.generateKeyPairHex()
    const plaintext = 'Hello, SM2!'
    
    const encrypted = sm2.doEncrypt(plaintext, keyPair.publicKey)
    const decrypted = sm2.doDecrypt(encrypted, keyPair.privateKey)
    
    expect(decrypted).toBe(plaintext)
    expect(encrypted).not.toBe(plaintext)
  })
  
  it('应该使用不同密钥产生不同结果', () => {
    const plaintext = 'test'
    const keyPair1 = sm2.generateKeyPairHex()
    const keyPair2 = sm2.generateKeyPairHex()
    
    const encrypted1 = sm2.doEncrypt(plaintext, keyPair1.publicKey)
    const encrypted2 = sm2.doEncrypt(plaintext, keyPair2.publicKey)
    
    expect(encrypted1).not.toBe(encrypted2)
  })
})
```

### 异步函数测试
```javascript
describe('异步函数测试', () => {
  it('应该正确处理 Promise', async () => {
    const result = await asyncFunction('input')
    expect(result).toBe('expected')
  })
  
  it('应该处理 Promise 拒绝', async () => {
    await expect(asyncFunction('invalid'))
      .rejects.toThrow('Error message')
  })
})
```

## 测试覆盖率

### 覆盖率目标
- **语句覆盖率**: > 90%
- **分支覆盖率**: > 85%
- **函数覆盖率**: > 95%
- **行覆盖率**: > 90%

### 查看覆盖率报告
```bash
# 生成覆盖率报告
npm run test:coverage

# 查看 HTML 报告
open coverage/index.html
```

### 提升覆盖率策略
1. 找出未覆盖的代码分支
2. 针对性添加边界测试
3. 确保错误处理分支被测试
4. 添加性能测试用例

## 测试最佳实践

### 测试命名规范
```javascript
// ✅ 好的命名
describe('chunk function', () => {
  it('应该将数组分割为指定大小的块', () => {})
  it('应该在 size 为 0 时返回空数组', () => {})
})

// ❌ 避免的命名
describe('test', () => {
  it('works', () => {})
})
```

### 测试数据管理
```javascript
// 使用工厂函数创建测试数据
const createTestUser = (overrides = {}) => ({
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  ...overrides
})

// 共享测试数据
export const testArrays = {
  empty: [],
  small: [1, 2, 3],
  large: Array.from({length: 1000}, (_, i) => i)
}
```

### 错误测试模式
```javascript
it('应该抛出详细的错误信息', () => {
  expect(() => {
    invalidFunction(null)
  }).toThrow('Parameter cannot be null')
})

// 检查错误类型
it('应该抛出类型错误', () => {
  expect(() => {
    typeCheckFunction(123)
  }).toThrow(TypeError)
})
```

### 性能测试模式
```javascript
it('应该在合理时间内完成', () => {
  const largeArray = Array.from({length: 10000}, (_, i) => i)
  
  const start = performance.now()
  const result = chunk(largeArray, 100)
  const end = performance.now()
  
  expect(end - start).toBeLessThan(100) // 100ms内完成
  expect(result).toHaveLength(100)
})
```

### Mock 使用指南
```javascript
import { vi } from 'vitest'

// Mock 函数
const mockFn = vi.fn()
mockFn.mockReturnValue('mocked value')

// Mock 模块
vi.mock('./module', () => ({
  default: vi.fn(() => 'mocked')
}))

// 验证调用
expect(mockFn).toHaveBeenCalledWith('expected')
expect(mockFn).toHaveBeenCalledTimes(1)
```

## 持续集成

### GitHub Actions 配置
```yaml
name: Test
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm test
      - run: npm run test:coverage
```

### Pre-commit 钩子
```bash
#!/bin/sh
# 运行测试
npm test
if [ $? -ne 0 ]; then
  echo "测试失败，提交已取消"
  exit 1
fi
```

## 故障排除

### 常见问题
1. **测试不稳定**: 确保测试独立性，每次重新创建测试数据
2. **异步测试超时**: 增加超时时间或优化异步逻辑
3. **Mock 不生效**: 确保在正确时机设置 Mock
4. **覆盖率不达标**: 添加边界测试和错误处理测试

### 调试测试
```bash
# 运行特定测试文件
npm test chunk.test.js

# 调试模式运行
npm test -- --inspect-brk

# 详细输出
npm test -- --verbose
```

---

更多测试相关信息，请参考：
- **Vitest 官方文档**: https://vitest.dev/
- **测试最佳实践**: https://jestjs.io/docs/en/expect
- **覆盖率报告**: 运行 `npm run test:coverage` 查看