import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'

import { FlatConfigItem } from '../types'

export default function simpleImportSort(): FlatConfigItem[] {
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
