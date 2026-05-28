import { Linter } from 'eslint'
import { Options as PrettierOptions } from 'prettier'

import type { RuleOptions } from './typegen'

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

export type ResolvedOptions<T> = Exclude<NonNullable<T>, boolean>
