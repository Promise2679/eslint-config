import reactPlugin from '@eslint-react/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX } from '../globs'
import { ConfigContext, FlatConfigItem } from '../types'

export default function react(_ctx: ConfigContext): FlatConfigItem[] {
  return [
    {
      files: [GLOB_JS, GLOB_TS, GLOB_JSX, GLOB_TSX],
      languageOptions: {
        parser: tsParser,
        parserOptions: {
          projectService: true,
          tsconfigRootDir: process.cwd()
        }
      },
      name: 'react',
      plugins: { '@eslint-react': reactPlugin },
      rules: {
        ...reactPlugin.configs['strict-type-checked'].rules,
        '@eslint-react/naming-convention-context-name': 'off',
        '@eslint-react/use-state': ['error', { enforceSetterName: false }]
      }
    }
  ]
}
