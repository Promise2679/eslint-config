import eslintImportPlugin from 'eslint-plugin-import-x'

import type { ConfigContext, FlatConfigItem } from '../types'

import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX, GLOB_VUE } from '../globs'

export default function importX(_ctx: ConfigContext): FlatConfigItem[] {
  return [
    {
      files: [GLOB_JS, GLOB_TS, GLOB_JSX, GLOB_TSX, GLOB_VUE],
      name: 'import',
      plugins: { 'import-x': eslintImportPlugin },
      rules: {
        ...eslintImportPlugin.configs['flat/recommended'].rules,
        'import-x/named': 'off',
        'import-x/no-named-as-default': 'off',
        'import-x/no-named-as-default-member': 'off',
        'import-x/no-unresolved': 'off'
      }
    }
  ]
}
