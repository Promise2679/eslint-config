import { ParserOptions } from '@typescript-eslint/parser'
import { Linter } from 'eslint'
import { Options as PrettierOptions } from 'prettier'

import type { RuleOptions } from './typegen'

export type FlatConfigItem = {
  plugins?: Record<string, unknown>
  rules?: Record<string, Linter.RuleEntry> & RuleOptions
} & Omit<Linter.Config, 'plugins' | 'rules'>

export interface OptionsComponentExts {
  componentExts?: string[]
}

export interface OptionsConfig extends OptionsComponentExts {
  ignores?: string[]
  overrides?: OverridesConfigs
  prettier?: boolean | OptionsPrettier
  ts?: boolean | OptionsTypeScriptParserOptions
  vue?: boolean
}

export interface OptionsIgnores {
  userIgnores?: string[]
}

export interface OptionsOverrides {
  overrides?: Linter.RulesRecord
  ts?: boolean
}

export interface OptionsPrettier {
  /** 对哪些文件启用 prettier，默认全部启用 */
  lang?: {
    /** css, less, scss 文件 */
    css: boolean
    /** js, ts, vue 文件 */
    es: boolean
    html: boolean
    /** json, json5, jsonc 文件 */
    json: boolean
  }
  prettierSelfOptions?: PrettierOptions
}

export interface OptionsTypeScriptParserOptions {
  parserOptions?: Partial<ParserOptions>
}

export interface OverridesConfigs {
  ts?: Linter.RulesRecord
  vue?: Linter.RulesRecord
}
