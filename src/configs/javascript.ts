import eslintJS from '@eslint/js'
import globals from 'globals'

import type { ConfigFn } from '../types'

import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX, GLOB_VUE } from '../globs'

const javascript: ConfigFn = _ctx => ({
  files: [GLOB_JS, GLOB_TS, GLOB_JSX, GLOB_TSX, GLOB_VUE],
  languageOptions: {
    ecmaVersion: 2022,
    globals: {
      ...globals.browser,
      ...globals.es2021,
      ...globals.node,
      document: 'readonly',
      navigator: 'readonly',
      window: 'readonly'
    },
    parserOptions: { ecmaFeatures: { jsx: true }, ecmaVersion: 2022, sourceType: 'module' },
    sourceType: 'module'
  },
  linterOptions: { reportUnusedDisableDirectives: true },
  name: 'javascript',
  rules: {
    ...eslintJS.configs.recommended.rules,
    'arrow-body-style': 'error',
    camelcase: 'warn',
    curly: ['error', 'multi'],
    'dot-notation': 'error',
    'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
    'no-else-return': ['error', { allowElseIf: false }],
    'no-implicit-coercion': 'error',
    'no-lonely-if': 'error',
    'no-nested-ternary': 'error',
    'no-undef': 'off',
    'no-unneeded-ternary': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'no-warning-comments': 'warn',
    'prefer-const': 'error',
    'prefer-template': 'error'
  }
})

export default javascript
