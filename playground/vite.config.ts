import { defineConfig } from 'vite'
import versionGitPlugin from '../src'

export default defineConfig({
  plugins: [
    versionGitPlugin(),
  ],
})
