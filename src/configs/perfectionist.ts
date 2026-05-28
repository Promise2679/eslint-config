import perfectionistPlugin from 'eslint-plugin-perfectionist'

import type { FlatConfigItem } from '../types'

import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX, GLOB_VUE } from '../globs'

export default function perfectionist(): FlatConfigItem[] {
  return [
    {
      files: [GLOB_JS, GLOB_TS, GLOB_JSX, GLOB_TSX, GLOB_VUE],
      name: 'perfectionist',
      plugins: { perfectionist: perfectionistPlugin },
      rules: perfectionistPlugin.configs['recommended-alphabetical'].rules as FlatConfigItem['rules']
    }
  ]
}
