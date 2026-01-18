import uniconPlugin from 'eslint-plugin-unicorn';

import type { FlatConfigItem } from '../types';

export default function unicorn(): FlatConfigItem[] {
  return [
    { name: 'zjutjh/unicorn/setup', plugins: { unicorn: uniconPlugin } },
    {
      name: 'zjutjh/unicorn/rules',
      rules: {
        ...uniconPlugin.configs.recommended.rules,
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/no-null': 'off',
        'unicorn/better-regex': 'error',
        'unicorn/explicit-length-check': 'off',
        'unicorn/filename-case': 'off',
        'unicorn/prefer-import-meta-properties': 'error',
        'unicorn/numeric-separators-style': 'off',
        'unicorn/catch-error-name': 'off'
      }
    }
  ];
}
