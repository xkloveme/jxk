import * as monaco from 'monaco-editor-core'
import { createHighlighter } from 'shiki'
import { shikiToMonaco } from '@shikijs/monaco'

import langVue from 'shiki/langs/vue.mjs'
import themeDark from 'shiki/themes/dark-plus.mjs'
import themeLight from 'shiki/themes/light-plus.mjs'

export async function registerHighlighter() {
  const highlighter = await createHighlighter({
    themes: [themeDark, themeLight],
    langs: [langVue],
  })
  monaco.languages.register({ id: 'vue' })
  shikiToMonaco(highlighter, monaco)
  return {
    light: themeLight.name!,
    dark: themeDark.name!,
  }
}