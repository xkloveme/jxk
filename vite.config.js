import { resolve } from 'path'
import VersionGitPlugin from 'vite-plugin-git-version'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
export default defineConfig({
  build: {
    outDir: 'lib',
    minify: false,
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'jxk',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: [], // 在这里列出外部依赖
      output: {
        preserveModules: true,
        exports: 'named'
      }
    },
  },
  plugins: [
    VersionGitPlugin(),
    dts({
      insertTypesEntry:true,
      rollupTypes: true,
      clearPureImport: false
    })
  ],
})