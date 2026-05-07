import reactPlugin from '@eslint-react/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX } from '../globs'
import { FlatConfigItem } from '../types'

export default function react(): FlatConfigItem[] {
  return [
    {
      files: [GLOB_TS, GLOB_JS, GLOB_TSX, GLOB_JSX],
      languageOptions: {
        parser: tsParser,
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname
        }
      },
      name: 'react',
      plugins: { '@eslint-react': reactPlugin },
      rules: { ...(reactPlugin.configs['strict-type-checked'].rules as FlatConfigItem['rules']) }
    }
  ]
}
