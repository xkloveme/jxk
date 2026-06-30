# jxk 贡献指南

欢迎为 jxk 项目做出贡献！本指南将帮助您了解如何参与项目开发。

## 目录
1. [开发环境配置](#开发环境配置)
2. [代码规范](#代码规范)
3. [提交流程](#提交流程)
4. [测试要求](#测试要求)
5. [文档编写](#文档编写)
6. [发布流程](#发布流程)

## 开发环境配置

### 系统要求
- Node.js >= 18.0.0
- pnpm >= 8.0.0 (推荐)
- Git >= 2.20.0

### 环境搭建

#### 1. 克隆项目
```bash
git clone https://github.com/xkloveme/jxk.git
cd jxk
```

#### 2. 安装依赖
```bash
# 使用 pnpm (推荐)
pnpm install

# 或使用 npm
npm install
```

#### 3. 启动开发环境
```bash
# 启动开发服务器
npm run dev

# 运行测试
npm test

# 构建项目
npm run build
```

### 推荐 IDE 配置

#### VS Code 扩展
- **ESLint**: 代码检查
- **Prettier**: 代码格式化
- **TypeScript**: 类型支持
- **Vitest**: 测试支持

#### 配置文件
项目已包含以下配置文件：
- `.eslintrc` - ESLint 配置
- `tsconfig.json` - TypeScript 配置
- `vitest.config.js` - 测试配置

## 代码规范

### JavaScript/TypeScript 规范

#### 命名规范
- **函数名**: 小驼峰命名 `camelCase`
- **常量名**: 全大写 + 下划线 `CONSTANT_VALUE`
- **文件名**: 小写 + 可选连字符 `fileName.js`
- **目录名**: 小写 `dirname`

#### 编码风格
```javascript
// ✅ 推荐的写法
function processData(items) {
    return items
        .filter(item => item.active)
        .map(item => item.name)
        .sort()
}

// ❌ 避免的写法
function processData(items){
    return items.filter(function(item){return item.active}).map(function(item){return item.name}).sort()
}
```

#### 注释规范
所有公开函数必须包含完整的 JSDoc 注释：

```javascript
/**
 * 函数功能的简短描述
 * 
 * @description 详细描述函数的功能、用途和注意事项
 * 
 * @category 模块分类 (array, string, time, browser, etc.)
 * @alias 函数别名，格式为 {category}_{functionName}
 * @author 作者信息 <邮箱>
 * @since 版本号
 * 
 * @param {Type} paramName - 参数描述
 * @param {Type} [optionalParam] - 可选参数描述
 * @param {Type} [optionalParam=defaultValue] - 带默认值的可选参数
 * 
 * @returns {Type} 返回值描述
 * 
 * @throws {ErrorType} 错误描述
 * 
 * @example
 * // 基本用法
 * functionName(param1, param2)
 * // => 期望结果
 * 
 * @example
 * // 复杂用法
 * functionName(complexParam, {
 *   option1: 'value1',
 *   option2: 'value2'
 * })
 * // => 期望结果
 */
export default function functionName(paramName, optionalParam = defaultValue) {
    // 函数实现
}
```

### 必需的 JSDoc 标签
- `@description` - 详细功能描述
- `@category` - 模块分类
- `@alias` - 函数别名
- `@author` - 作者信息
- `@param` - 参数说明
- `@returns` - 返回值说明
- `@example` - 使用示例（至少一个）

### 可选的 JSDoc 标签
- `@since` - 引入版本
- `@throws` - 异常说明
- `@deprecated` - 废弃说明
- `@see` - 相关链接

## 提交流程

### Git 工作流

#### 1. 创建功能分支
```bash
# 从 main 分支创建新分支
git checkout main
git pull origin main
git checkout -b feature/new-function-name
```

#### 2. 提交变更
```bash
# 添加文件
git add .

# 提交（遵循 Conventional Commits 规范）
git commit -m "feat: add new array function chunk"
```

#### 3. 推送分支
```bash
git push origin feature/new-function-name
```

#### 4. 创建 Pull Request
- 在 GitHub 上创建 PR
- 填写详细的描述
- 关联相关 Issue
- 等待代码审查

### 提交信息规范

使用 [Conventional Commits](https://conventionalcommits.org/) 规范：

```
type(scope): description

[optional body]

[optional footer]
```

#### 类型说明
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式化
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建/工具相关

#### 示例
```bash
# 新增功能
git commit -m "feat(array): add shuffle function"

# 修复 bug
git commit -m "fix(sm2): resolve encryption issue with special characters"

# 更新文档
git commit -m "docs: update API documentation for time module"

# 重构代码
git commit -m "refactor(string): optimize camelCase function performance"
```

## 测试要求

### 测试覆盖率
- **语句覆盖率**: > 90%
- **分支覆盖率**: > 85%
- **函数覆盖率**: > 95%
- **行覆盖率**: > 90%

### 测试文件规范

#### 文件命名
- 测试文件命名: `functionName.test.js`
- 与源文件放在同一目录

#### 测试结构
```javascript
import { describe, it, expect } from 'vitest'
import functionName from './functionName.js'

describe('functionName', () => {
  describe('基本功能', () => {
    it('应该正确处理正常输入', () => {
      const result = functionName('normal input')
      expect(result).toBe('expected output')
    })
    
    it('应该正确处理空输入', () => {
      const result = functionName('')
      expect(result).toBe('')
    })
  })
  
  describe('边界情况', () => {
    it('应该处理 null 和 undefined', () => {
      expect(functionName(null)).toBe(null)
      expect(functionName(undefined)).toBe(undefined)
    })
    
    it('应该处理极大值', () => {
      const largeInput = 'x'.repeat(10000)
      expect(() => functionName(largeInput)).not.toThrow()
    })
  })
  
  describe('错误处理', () => {
    it('应该抛出正确的错误', () => {
      expect(() => functionName(123)).toThrow('Parameter must be string')
    })
  })
})
```

### 运行测试
```bash
# 运行所有测试
npm test

# 监听模式
npm run test:watch

# 覆盖率报告
npm run test:coverage
```

## 文档编写

### 文档类型
1. **JSDoc 注释** - 函数级文档
2. **README.md** - 项目概述
3. **API.md** - API 参考
4. **ARCHITECTURE.md** - 架构说明
5. **TESTING.md** - 测试文档

### 文档要求
- 使用中文编写
- 提供完整的示例代码
- 包含常见用法和边界情况
- 定期更新保持同步

### 生成文档
```bash
# 生成 JSDoc 文档
npm run docs

# 构建完整文档站点
npm run build:docs
```

## 新功能开发流程

### 1. 规划阶段
- 在 GitHub Issues 中讨论新功能
- 确定 API 设计和实现方案
- 评估性能和兼容性影响

### 2. 实现阶段

#### 创建新模块
```bash
# 创建模块目录
mkdir src/lib/newmodule

# 创建函数文件
touch src/lib/newmodule/newFunction.js
touch src/lib/newmodule/newFunction.test.js
```

#### 实现函数
```javascript
// src/lib/newmodule/newFunction.js
/**
 * 新功能函数描述
 * @category newmodule
 * @alias newmodule_newFunction
 * @param {any} param - 参数描述
 * @returns {any} 返回值描述
 * @author your-name <your-email>
 * @example
 * newFunction(param)
 * // => result
 */
export default function newFunction(param) {
    // 参数验证
    if (!param) {
        throw new Error('Parameter is required')
    }
    
    // 实现逻辑
    return processedResult
}
```

#### 创建测试
```javascript
// src/lib/newmodule/newFunction.test.js
import { describe, it, expect } from 'vitest'
import newFunction from './newFunction.js'

describe('newFunction', () => {
  it('should work correctly', () => {
    const result = newFunction('test')
    expect(result).toBe('expected')
  })
})
```

#### 添加模块元信息
```json
// src/lib/newmodule/_meta.json
{
  "name": "newmodule",
  "description": "新模块描述",
  "version": "1.0.0",
  "author": "your-name"
}
```

### 3. 测试阶段
```bash
# 运行新增函数的测试
npm test newFunction

# 运行所有测试确保无回归
npm test

# 检查代码覆盖率
npm run test:coverage
```

### 4. 构建阶段
```bash
# 重新生成入口文件
npm run gen

# 构建项目
npm run build

# 验证构建结果
node -e "console.log(require('./lib/index.cjs.js').newFunction)"
```

### 5. 文档阶段
- 更新 API.md 文档
- 生成 JSDoc 文档
- 更新 README.md（如需要）

## 代码审查

### 审查清单

#### 功能性
- [ ] 功能实现正确
- [ ] 处理所有边界情况
- [ ] 错误处理完善
- [ ] 性能表现良好

#### 代码质量
- [ ] 代码简洁易读
- [ ] 遵循项目规范
- [ ] 无代码重复
- [ ] 合理的抽象层次

#### 测试
- [ ] 测试覆盖充分
- [ ] 测试用例设计合理
- [ ] 包含边界测试
- [ ] 无测试遗漏

#### 文档
- [ ] JSDoc 注释完整
- [ ] 示例代码正确
- [ ] 文档描述清晰
- [ ] 更新相关文档

### 审查建议
- 使用建设性的语言
- 提供具体的改进建议
- 解释问题的原因
- 给出替代方案

## 发布流程

### 版本管理
使用语义化版本控制：
- `MAJOR.MINOR.PATCH`
- **MAJOR**: 不兼容的 API 变更
- **MINOR**: 向后兼容的新功能
- **PATCH**: 向后兼容的问题修复

### 发布步骤

#### 1. 准备发布
```bash
# 确保所有测试通过
npm test

# 确保构建成功
npm run build

# 更新版本号
npm run release
```

#### 2. 发布到 NPM
```bash
# 发布
npm publish
```

#### 3. 发布文档
```bash
# 构建并部署文档
npm run build:docs
```

### 发布清单
- [ ] 所有测试通过
- [ ] 代码覆盖率达标
- [ ] 文档更新完整
- [ ] CHANGELOG 更新
- [ ] 版本号正确
- [ ] 构建产物正确

## 社区参与

### 报告问题
- 使用 GitHub Issues
- 提供详细的重现步骤
- 包含环境信息
- 提供最小化示例

### 功能请求
- 在 Issues 中描述需求
- 说明使用场景
- 讨论 API 设计
- 评估实现难度

### 参与讨论
- 在 Issues 中参与讨论
- 提供建设性建议
- 分享使用经验
- 帮助其他用户

## 获取帮助

### 联系方式
- **GitHub Issues**: https://github.com/xkloveme/jxk/issues
- **邮箱**: xkloveme@gmail.com
- **官方文档**: https://jxk.jixiaokang.com/

### 开发资源
- **项目架构**: 查看 ARCHITECTURE.md
- **API 文档**: 查看 API.md
- **测试指南**: 查看 TESTING.md
- **在线演示**: https://jxk.jixiaokang.com/playground/

感谢您对 jxk 项目的贡献！🎉
