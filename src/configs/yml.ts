import ymlPlugin from 'eslint-plugin-yml'

import { GLOB_YML } from '../globs'
import { FlatConfigItem } from '../types'

const ymlRecommendedRules = ymlPlugin.configs.standard.reduce((rules, config) => {
  if (config.rules) return { ...rules, ...config.rules }
  return rules
}, {}) as FlatConfigItem['rules']

export function yml(): FlatConfigItem[] {
  return [
    {
      files: [GLOB_YML],
      language: 'yml/yaml',
      name: 'yml',
      plugins: { yml: ymlPlugin },
      rules: {
        ...ymlRecommendedRules,
        'yml/quotes': ['error', { prefer: 'single' }]
      }
    }
  ]
}
