import configPrettier from 'eslint-plugin-prettier/recommended'
import { Options as PrettierOptions } from 'prettier'

import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX, GLOB_VUE } from '../globs'
import { FlatConfigItem } from '../types'

/**
 * @see https://prettier.io/docs/options
 */
const prettierOptions: PrettierOptions = {
  arrowParens: 'avoid',
  objectWrap: 'collapse',
  printWidth: 120,
  semi: false,
  singleQuote: true,
  trailingComma: 'none'
}

export default function prettier(options: PrettierOptions): FlatConfigItem[] {
  return [
    {
      files: [GLOB_VUE, GLOB_TS, GLOB_JS, GLOB_TSX, GLOB_JSX],
      name: 'prettier',
      ...configPrettier,
      rules: { 'prettier/prettier': ['error', { ...prettierOptions, ...options }] }
    }
  ]
}
