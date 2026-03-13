import { Linter } from 'eslint'
import { Options as PrettierOptions } from 'prettier'

import type { RuleOptions } from './typegen'

export type FlatConfigItem = {
  plugins?: Record<string, any>
  rules?: Record<string, Linter.RuleEntry> & RuleOptions
} & Omit<Linter.Config, 'plugins' | 'rules'>

export interface OptionsConfig {
  enable?: { prettier?: boolean | PrettierOptions; ts?: boolean; vue?: boolean }
  ignores?: string[]
  rules?: FlatConfigItem['rules']
}

export type ResolvedOptions<T> = Exclude<NonNullable<T>, boolean>
