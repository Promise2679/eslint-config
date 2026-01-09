import eslintImportPlugin from 'eslint-plugin-import';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';

import type { FlatConfigItem } from '../types';

export default function imports(): FlatConfigItem[] {
  return [
    {
      name: 'zjutjh/imports/setup',
      plugins: { 'simple-import-sort': simpleImportSortPlugin, import: eslintImportPlugin }
    },
    {
      name: 'zjutjh/imports/rules',
      rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'import/no-duplicates': 'error'
      }
    }
  ];
}
