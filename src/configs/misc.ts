import uniconPlugin from 'eslint-plugin-unicorn';

import type { FlatConfigItem } from '../types';

export default function misc(): FlatConfigItem[] {
  return [
    { name: 'zjutjh/misc/setup', plugins: { unicorn: uniconPlugin } },
    {
      name: 'zjutjh/misc/rules',
      rules: {
        ...uniconPlugin.configs.recommended.rules,
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/no-null': 'off',
        'unicorn/prefer-export-from': 'off',
        'unicorn/better-regex': 'error',
        'unicorn/no-lonely-if': 'error',
        'unicorn/explicit-length-check': 'off',
        'unicorn/filename-case': 'off'
      }
    }
  ];
}
