import parserTs from '@typescript-eslint/parser'
import pluginVue from 'eslint-plugin-vue'
import parserVue from 'vue-eslint-parser'

import { GLOB_VUE } from '../globs'
import { ConfigContext, FlatConfigItem } from '../types'
import { resolveRules } from '../utils'

export default function vue({ ts }: ConfigContext): FlatConfigItem[] {
  return [
    {
      files: [GLOB_VUE],
      languageOptions: {
        parser: parserVue,
        parserOptions: {
          ecmaFeatures: { jsx: true },
          extraFileExtensions: ['.vue'],
          parser: ts ? parserTs : null,
          sourceType: 'module'
        }
      },
      name: 'vue',
      plugins: { vue: pluginVue },
      processor: pluginVue.processors['.vue'],
      rules: {
        ...resolveRules(pluginVue.configs['flat/recommended']),
        'vue/html-self-closing': ['warn', { html: { void: 'always' } }],
        'vue/max-attributes-per-line': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-multiple-template-root': 'off',
        'vue/prefer-true-attribute-shorthand': 'error',
        'vue/require-default-prop': 'off',
        'vue/return-in-computed-property': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/valid-v-slot': ['error', { allowModifiers: true }]
      }
    }
  ]
}
