import ymlPlugin from 'eslint-plugin-yml'

import { GLOB_YML } from '../globs'
import { ConfigFn } from '../types'
import { resolveRules } from '../utils'

const yml: ConfigFn = _ctx => ({
  files: [GLOB_YML],
  language: 'yml/yaml',
  name: 'yml',
  plugins: { yml: ymlPlugin },
  rules: {
    ...resolveRules(ymlPlugin.configs.standard),
    'yml/quotes': ['error', { prefer: 'single' }]
  }
})

export default yml
