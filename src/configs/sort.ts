import eslintImportPlugin from 'eslint-plugin-import';
import perfectionistPlugin from 'eslint-plugin-perfectionist';

import type { FlatConfigItem } from '../types';

export default function sort(): FlatConfigItem[] {
  return [
    {
      name: 'sort',
      plugins: { import: eslintImportPlugin, perfectionist: perfectionistPlugin },
      rules: { ...perfectionistPlugin.configs['recommended-alphabetical'].rules, 'import/no-duplicates': 'error' }
    }
  ];
}
