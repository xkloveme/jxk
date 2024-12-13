import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import replace from '@rollup/plugin-replace'
import path from 'path'

export default defineConfig({
  base: "./",
  plugins: [
    vue({
      script: {
        defineModel: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@vue/compiler-dom': '@vue/compiler-dom/dist/compiler-dom.cjs.js',
      '@vue/compiler-core': '@vue/compiler-core/dist/compiler-core.cjs.js',
    },
  },
  build: {
    outDir: path.resolve(__dirname, '../docs/playground'),
    emptyOutDir: true,
    commonjsOptions: {
      ignore: ['typescript'],
    },
  },
  worker: {
    format: 'es',
    plugins: () => [
      replace({
        preventAssignment: true,
        values: {
          'process.env.NODE_ENV': JSON.stringify('production'),
        },
      }) as any,
    ],
  },
})
