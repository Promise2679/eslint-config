import eslintJS from '@eslint/js';
import globals from 'globals';

import type { FlatConfigItem } from '../types';

export default function javascript(): FlatConfigItem[] {
  return [
    {
      name: 'javascript',
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
      rules: {
        ...eslintJS.configs.recommended.rules,
        camelcase: 'error',
        'no-warning-comments': 'warn',
        'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
        'no-var': 'error',
        'no-undef': 'off',
        'prefer-const': 'error',
        'no-nested-ternary': 'error',
        'no-unneeded-ternary': 'error',
        'no-else-return': ['error', { allowElseIf: false }],
        'no-implicit-coercion': 'error',
        'no-useless-concat': 'error',
        'prefer-template': 'error',
        'no-lonely-if': 'error'
      }
    }
  ];
}
