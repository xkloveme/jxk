import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  externals: ['date-fns'], // 外部依赖，如果不需要则为空数组
  declaration: true, // 生成 .d.ts 文件
  clean: true, // 构建前清理输出目录
  outDir: 'dist/types', // 输出目录
  rollup: {
    emitCJS: false, // 同时输出 CommonJS 版本
    esbuild: {
      minify: true, // 压缩输出文件
    },
  },
});