import { Options as PrettierOptions } from 'prettier'

import {
  GLOB_CSS,
  GLOB_HTML,
  GLOB_JS,
  GLOB_JSON,
  GLOB_JSON5,
  GLOB_JSONC,
  GLOB_JSX,
  GLOB_LESS,
  GLOB_SCSS,
  GLOB_TS,
  GLOB_TSX,
  GLOB_VUE
} from '../globs'
import { FlatConfigItem, OptionsPrettier } from '../types'
import { ensurePackages, interopDefault } from '../utils'

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

export default async function prettier(options?: OptionsPrettier) {
  await ensurePackages(['eslint-plugin-format', 'eslint-plugin-prettier', 'eslint-config-prettier', 'prettier'])

  const [configPrettier, pluginFormat] = await Promise.all([
    interopDefault(import('eslint-plugin-prettier/recommended')),
    interopDefault(import('eslint-plugin-format'))
  ])

  const {
    css: enableCSSFormat = true,
    es: enableESFormat = true,
    html: enableHTMLFormat = true,
    json: enableJSONFormat = true
  } = options?.lang ?? {}

  const mergedPrettierOptions = { ...prettierOptions, ...options?.prettierSelfOptions }

  const configs: FlatConfigItem[] = []

  if (enableESFormat)
    configs.push({
      files: [GLOB_VUE, GLOB_TS, GLOB_JS, GLOB_TSX, GLOB_JSX],
      name: 'prettier/es',
      ...configPrettier,
      rules: { 'prettier/prettier': ['error', mergedPrettierOptions] }
    })

  if (enableCSSFormat)
    configs.push({
      files: [GLOB_CSS, GLOB_LESS, GLOB_SCSS],
      languageOptions: { parser: pluginFormat.parserPlain },
      name: 'prettier/css',
      plugins: { format: pluginFormat },
      rules: { 'format/prettier': ['error', { mergedPrettierOptions, parser: 'css' }] }
    })

  if (enableHTMLFormat)
    configs.push({
      files: [GLOB_HTML],
      languageOptions: { parser: pluginFormat.parserPlain },
      name: 'prettier/html',
      plugins: { format: pluginFormat },
      rules: { 'format/prettier': ['error', { mergedPrettierOptions, parser: 'html' }] }
    })

  if (enableJSONFormat)
    configs.push({
      files: [GLOB_JSON, GLOB_JSON5, GLOB_JSONC],
      languageOptions: { parser: pluginFormat.parserPlain },
      name: 'prettier/json',
      plugins: { format: pluginFormat },
      rules: { 'format/prettier': ['error', { mergedPrettierOptions, parser: 'json' }] }
    })

  return configs
}
