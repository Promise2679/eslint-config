import regexpPlugin from 'eslint-plugin-regexp'

import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX, GLOB_VUE } from '../globs'
import { ConfigFn } from '../types'

const regexp: ConfigFn = _ctx => ({
  files: [GLOB_JS, GLOB_TS, GLOB_JSX, GLOB_TSX, GLOB_VUE],
  name: 'regexp',
  plugins: { regexp: regexpPlugin },
  rules: regexpPlugin.configs.recommended.rules
})

export default regexp
