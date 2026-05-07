import reactPlugin from '@eslint-react/eslint-plugin'

import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX } from '../globs'
import { FlatConfigItem } from '../types'

export default function react(): FlatConfigItem[] {
  return [
    {
      files: [GLOB_TS, GLOB_JS, GLOB_TSX, GLOB_JSX],
      name: 'react',
      plugins: { '@eslint-react': reactPlugin },
      rules: { ...(reactPlugin.configs['strict-type-checked'].rules as FlatConfigItem['rules']) }
    }
  ]
}
