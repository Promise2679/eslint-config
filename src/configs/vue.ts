import parserTs from '@typescript-eslint/parser'
import pluginVue from 'eslint-plugin-vue'
import parserVue from 'vue-eslint-parser'

import { GLOB_VUE } from '../globs'
import { FlatConfigItem } from '../types'

export default function vue(enableTs: boolean): FlatConfigItem[] {
  return [
    {
      files: [GLOB_VUE],
      languageOptions: {
        parser: parserVue,
        parserOptions: {
          ecmaFeatures: { jsx: true },
          extraFileExtensions: ['.vue'],
          parser: enableTs ? parserTs : null,
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
        'vue/return-in-computed-property': 'off',
        'vue/valid-v-slot': ['error', { allowModifiers: true }]
      }
    }
  ]
}
