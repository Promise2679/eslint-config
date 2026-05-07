import eslintImportPlugin from 'eslint-plugin-import-x'

import type { FlatConfigItem } from '../types'

export default function importX(): FlatConfigItem[] {
  return [
    {
      name: 'import',
      plugins: { 'import-x': eslintImportPlugin },
      rules: {
        ...eslintImportPlugin.configs['flat/recommended'].rules,
        'import-x/named': 'off',
        'import-x/no-named-as-default-member': 'off',
        'import-x/no-unresolved': 'off'
      }
    }
  ]
}
