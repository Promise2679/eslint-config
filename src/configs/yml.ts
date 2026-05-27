import ymlPlugin from 'eslint-plugin-yml'

import { GLOB_YML } from '../globs'
import { FlatConfigItem } from '../types'
import { resolveRules } from '../utils'

export function yml(): FlatConfigItem[] {
  return [
    {
      files: [GLOB_YML],
      language: 'yml/yaml',
      name: 'yml',
      plugins: { yml: ymlPlugin },
      rules: {
        ...resolveRules(ymlPlugin.configs.standard),
        'yml/quotes': ['error', { prefer: 'single' }]
      }
    }
  ]
}
