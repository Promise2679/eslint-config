import { GLOB_VUE } from '../globs'
import { FlatConfigItem } from '../types'
import { ensurePackages, interopDefault } from '../utils'

export default async function vue(enableTs: boolean): Promise<FlatConfigItem[]> {
  await ensurePackages(['eslint-plugin-vue', 'vue-eslint-parser'])

  const [pluginVue, parserVue] = await Promise.all([
    interopDefault(import('eslint-plugin-vue')),
    interopDefault(import('vue-eslint-parser'))
  ])

  return [
    {
      files: [GLOB_VUE],
      languageOptions: {
        parser: parserVue,
        parserOptions: {
          ecmaFeatures: { jsx: true },
          extraFileExtensions: ['.vue'],
          parser: enableTs ? await interopDefault(import('@typescript-eslint/parser')) : null,
          sourceType: 'module'
        }
      },
      name: 'vue',
      plugins: { vue: pluginVue },
      processor: pluginVue.processors['.vue'],
      rules: {
        ...pluginVue.configs.essential.rules,
        'vue/multi-word-component-names': 'off',
        'vue/prefer-true-attribute-shorthand': 'error',
        'vue/return-in-computed-property': 'off'
      }
    }
  ]
}
