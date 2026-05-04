import perfectionistPlugin from 'eslint-plugin-perfectionist'
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'

import type { FlatConfigItem } from '../types'

export function perfectionist(): FlatConfigItem[] {
  return [
    {
      name: 'sort',
      plugins: { perfectionist: perfectionistPlugin },
      rules: perfectionistPlugin.configs['recommended-alphabetical'].rules as FlatConfigItem['rules']
    }
  ]
}

export function simpleImportSort(): FlatConfigItem[] {
  return [
    {
      name: 'simple-import-sort',
      plugins: { 'simple-import-sort': simpleImportSortPlugin },
      rules: {
        'simple-import-sort/exports': 'error',
        'simple-import-sort/imports': 'error'
      }
    }
  ]
}
