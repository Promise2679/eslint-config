import eslintImportPlugin from 'eslint-plugin-import';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';

import type { FlatConfigItem } from '../types';

export default function imports(): FlatConfigItem[] {
  return [
    {
      name: 'imports',
      plugins: { 'simple-import-sort': simpleImportSortPlugin, import: eslintImportPlugin },
      rules: {
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'import/no-duplicates': 'error'
      }
    }
  ];
}
