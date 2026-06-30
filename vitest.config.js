import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // 启用全局测试函数
    globals: true,
    
    // 测试环境配置 
    environment: 'node',
    
    // 测试文件匹配模式
    include: ['src/lib/**/*.test.js', 'test/**/*.test.{js,ts}'],
    
    // 测试超时时间
    testTimeout: 10000,
    
    // 输出配置
    reporter: 'verbose'
  }
})