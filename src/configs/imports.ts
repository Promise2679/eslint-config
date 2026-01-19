import eslintImportPlugin from 'eslint-plugin-import';
import perfectionistPlugin from 'eslint-plugin-perfectionist';

import type { FlatConfigItem } from '../types';

export default function imports(): FlatConfigItem[] {
  return [
    {
      name: 'imports',
      plugins: { import: eslintImportPlugin, perfectionist: perfectionistPlugin },
      rules: {
        ...perfectionistPlugin.configs['recommended-alphabetical'].rules,
        'import/no-duplicates': 'error'
      }
    }
  ];
}
