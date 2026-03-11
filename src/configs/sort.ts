import eslintImportPlugin from 'eslint-plugin-import-x'
import perfectionistPlugin from 'eslint-plugin-perfectionist'

import type { FlatConfigItem } from '../types'

export default function sort(): FlatConfigItem[] {
  return [
    {
      name: 'sort',
      plugins: { 'import-x': eslintImportPlugin, perfectionist: perfectionistPlugin },
      rules: {
        ...perfectionistPlugin.configs['recommended-alphabetical'].rules,
        ...eslintImportPlugin.configs['flat/recommended'].rules,
        'import-x/no-named-as-default-member': 'off',
        'import-x/no-unresolved': 'off'
      }
    }
  ]
}
