import uniconPlugin from 'eslint-plugin-unicorn';

import type { FlatConfigItem } from '../types';

export default function unicorn(): FlatConfigItem[] {
  return [
    {
      name: 'unicorn',
      plugins: { unicorn: uniconPlugin },
      rules: {
        ...uniconPlugin.configs.recommended.rules,
        'unicorn/better-regex': 'error',
        'unicorn/catch-error-name': 'off',
        'unicorn/explicit-length-check': 'off',
        'unicorn/filename-case': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/no-null': 'off',
        'unicorn/numeric-separators-style': 'off',
        'unicorn/prefer-import-meta-properties': 'error',
        'unicorn/prevent-abbreviations': 'off'
      }
    }
  ];
}
