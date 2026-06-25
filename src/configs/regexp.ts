import regexpPlugin from 'eslint-plugin-regexp'

import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX, GLOB_VUE } from '../globs'
import { ConfigContext, FlatConfigItem } from '../types'

export default function regexp(_ctx: ConfigContext): FlatConfigItem[] {
  return [
    {
      files: [GLOB_JS, GLOB_TS, GLOB_JSX, GLOB_TSX, GLOB_VUE],
      name: 'regexp',
      plugins: { regexp: regexpPlugin },
      rules: { ...regexpPlugin.configs.recommended.rules }
    }
  ]
}
