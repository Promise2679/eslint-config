import unicornPlugin from 'eslint-plugin-unicorn'

import type { ConfigFn, RulesTable } from '../types'

import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX, GLOB_VUE } from '../globs'
import { gateRules } from '../utils'

const rulesTable: RulesTable = {
  'unicorn/no-array-reverse': 2023,
  'unicorn/no-array-sort': 2023,
  'unicorn/prefer-at': 2022,
  'unicorn/prefer-dispose': 2026,
  'unicorn/prefer-regexp-escape': 2025,
  'unicorn/prefer-string-replace-all': 2021,
  'unicorn/prefer-temporal': 2026
}

const unicorn: ConfigFn = ({ esYear }) => ({
  files: [GLOB_JS, GLOB_TS, GLOB_JSX, GLOB_TSX, GLOB_VUE],
  name: 'unicorn',
  plugins: { unicorn: unicornPlugin },
  rules: {
    ...unicornPlugin.configs.recommended.rules,
    ...gateRules(esYear, rulesTable),
    'unicorn/catch-error-name': 'off',
    'unicorn/consistent-boolean-name': 'off',
    'unicorn/consistent-destructuring': 'error',
    'unicorn/empty-brace-spaces': 'off',
    'unicorn/error-message': 'off',
    'unicorn/explicit-timer-delay': ['error', 'never'],
    'unicorn/filename-case': 'off',
    'unicorn/max-nested-calls': 'off',
    'unicorn/name-replacements': 'off',
    'unicorn/no-abusive-eslint-disable': 'off',
    'unicorn/no-break-in-nested-loop': 'off',
    'unicorn/no-manually-wrapped-comments': 'error',
    'unicorn/no-misrefactored-assignment': 'off',
    'unicorn/no-non-function-verb-prefix': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-return-array-push': 'error',
    // 与 @typescript-eslint/no-extraneous-class 重复
    'unicorn/no-static-only-class': 'off',
    'unicorn/no-unreadable-for-of-expression': 'off',
    'unicorn/no-xor-as-exponentiation': 'off',
    'unicorn/numeric-separators-style': 'off',
    'unicorn/prefer-global-number-constants': 'off',
    'unicorn/prefer-import-meta-properties': 'error',
    'unicorn/prefer-number-coercion': 'off',
    'unicorn/prefer-number-is-safe-integer': 'off',
    'unicorn/prefer-number-properties': ['error', { checkNaN: true }],
    // querySelector 和 getElementById 返回类型并不一致
    'unicorn/prefer-query-selector': 'off',
    'unicorn/prefer-split-limit': 'off',
    // 与 @typescript-eslint/prefer-string-starts-ends-with 重复
    'unicorn/prefer-string-starts-ends-with': 'off',
    'unicorn/prefer-type-literal-last': 'off',
    'unicorn/switch-case-braces': ['error', 'avoid']
  }
})

export default unicorn
