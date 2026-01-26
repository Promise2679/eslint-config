import unicornPlugin from 'eslint-plugin-unicorn'

import type { FlatConfigItem, OptionsOverrides } from '../types'

export default function unicorn(options?: OptionsOverrides): FlatConfigItem[] {
  const enableTs = options?.ts
  return [
    {
      name: 'unicorn',
      plugins: { unicorn: unicornPlugin },
      rules: {
        ...unicornPlugin.configs.recommended.rules,
        'unicorn/better-regex': 'error',
        'unicorn/catch-error-name': 'off',
        'unicorn/empty-brace-spaces': 'off',
        'unicorn/error-message': 'off',
        'unicorn/explicit-length-check': 'off',
        'unicorn/filename-case': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/no-null': 'off',
        'unicorn/no-static-only-class': 'off',
        'unicorn/numeric-separators-style': 'off',
        'unicorn/prefer-import-meta-properties': 'error',
        'unicorn/prefer-string-starts-ends-with': enableTs ? 'off' : 'error',
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/switch-case-braces': ['error', 'avoid']
      }
    }
  ]
}
