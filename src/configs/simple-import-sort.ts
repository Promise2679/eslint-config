import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'

import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX, GLOB_VUE } from '../globs'
import { ConfigContext, FlatConfigItem } from '../types'

export default function simpleImportSort(_ctx: ConfigContext): FlatConfigItem[] {
  return [
    {
      files: [GLOB_JS, GLOB_TS, GLOB_JSX, GLOB_TSX, GLOB_VUE],
      name: 'simple-import-sort',
      plugins: { 'simple-import-sort': simpleImportSortPlugin },
      rules: {
        'simple-import-sort/exports': 'error',
        'simple-import-sort/imports': 'error'
      }
    }
  ]
}
