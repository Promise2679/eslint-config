import configPrettier from 'eslint-plugin-prettier/recommended'
import { Options as PrettierOptions } from 'prettier'

import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX, GLOB_VUE } from '../globs'
import { FlatConfigItem } from '../types'

/**
 * @see https://prettier.io/docs/options
 */
const prettierOptions: PrettierOptions = {
  arrowParens: 'avoid',
  printWidth: 120,
  semi: false,
  singleQuote: true,
  trailingComma: 'none'
}

const prettier = (options: PrettierOptions): FlatConfigItem => ({
  files: [GLOB_JS, GLOB_TS, GLOB_JSX, GLOB_TSX, GLOB_VUE],
  name: 'prettier',
  ...configPrettier,
  rules: { 'prettier/prettier': ['error', { ...prettierOptions, ...options }] }
})

export default prettier
