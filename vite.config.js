import { resolve } from 'path'
import VersionGitPlugin from 'vite-plugin-git-version'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, './src/index.js'),
      name: 'jxk',
      fileName: 'index',
    },
    rollupOptions: {},
  },
  plugins: [
    VersionGitPlugin(),
  ],
})