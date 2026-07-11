import { Linter } from 'eslint'
import { Options as PrettierOptions } from 'prettier'

import type { RuleOptions } from './typegen'

/** 各 config 函数统一接收的上下文 */
export interface ConfigContext {
  esYear: number
  ts: boolean
}

export type ConfigFn = (ctx: ConfigContext) => FlatConfigItem

export type FlatConfigItem = {
  plugins?: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
  rules?: RuleOptions
} & Omit<Linter.Config, 'plugins' | 'rules'>

export interface OptionsConfig {
  enable?: {
    prettier?: boolean | PrettierOptions
    react?: boolean
    sort?: 'perfectionist' | 'simple-import-sort' | boolean
    tailwindcss?: boolean
    ts?: boolean
    vue?: boolean
  }
  ignores?: string[]
  rules?: RuleOptions
}

export type RulesTable = Partial<Record<keyof RuleOptions, number>>
