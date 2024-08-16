import { computed, version as currentVersion, ref } from 'vue'
export function useVueImportMap(
  defaults: {
    runtimeDev?: string | (() => string)
    runtimeProd?: string | (() => string)
    serverRenderer?: string | (() => string)
    jxkFunction?: string | (() => string)
    vueVersion?: string | null
  } = {},
) {
  function normalizeDefaults(defaults?: string | (() => string)) {
    if (!defaults) return
    return typeof defaults === 'string' ? defaults : defaults()
  }

  const productionMode = ref(false)
  const vueVersion = ref<string | null>(defaults.vueVersion || null)
  const importMap = computed<ImportMap>(() => {
    const vue =
      (!vueVersion.value &&
        normalizeDefaults(
          productionMode.value ? defaults.runtimeProd : defaults.runtimeDev,
        )) ||
      `https://cdn.jsdelivr.net/npm/@vue/runtime-dom@${
        vueVersion.value || currentVersion
      }/dist/runtime-dom.esm-browser${productionMode.value ? `.prod` : ``}.js`

    const serverRenderer =
      (!vueVersion.value && normalizeDefaults(defaults.serverRenderer)) ||
      `https://cdn.jsdelivr.net/npm/@vue/server-renderer@${
        vueVersion.value || currentVersion
      }/dist/server-renderer.esm-browser.js`
      const jxk =
      normalizeDefaults(defaults.jxkFunction) ||
      `https://unpkg.com/jxk/lib/index.js`
    return {
      imports: {
        vue,
        'vue/server-renderer': serverRenderer,
        'date-fns': '//cdn.jsdelivr.net/npm/date-fns',
        'date-fns/': '//cdn.jsdelivr.net/npm/date-fns/',
        jxk,
      },
    }
  })

  return {
    productionMode,
    importMap,
    vueVersion,
    defaultVersion: currentVersion,
  }
}

export interface ImportMap {
  imports?: Record<string, string | undefined>
  scopes?: Record<string, Record<string, string>>
}

export function mergeImportMap(a: ImportMap, b: ImportMap): ImportMap {
  return {
    imports: { ...a.imports, ...b.imports },
    scopes: { ...a.scopes, ...b.scopes },
  }
}
