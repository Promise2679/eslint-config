import parserTs from '@typescript-eslint/parser'
import pluginVue from 'eslint-plugin-vue'
import parserVue from 'vue-eslint-parser'

import { GLOB_VUE } from '../globs'
import { FlatConfigItem } from '../types'

const vueRecommendedRules = pluginVue.configs['flat/recommended'].reduce((rules, config) => {
  if (config.rules) return { ...rules, ...config.rules }
  return rules
}, {}) as FlatConfigItem['rules']

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
        ...vueRecommendedRules,
        'vue/html-self-closing': ['warn', { html: { void: 'always' } }],
        'vue/max-attributes-per-line': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-multiple-template-root': 'off',
        'vue/prefer-true-attribute-shorthand': 'error',
        'vue/return-in-computed-property': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/valid-v-slot': ['error', { allowModifiers: true }]
      }
    }
  ]
}
