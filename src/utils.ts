import { Linter } from 'eslint'

import { RuleOptions } from './typegen'
import { ResolvedOptions } from './types'

export function resolveOptions<K>(value: K): ResolvedOptions<K> {
  if (typeof value === 'boolean') return {} as ResolvedOptions<K>
  return (value || {}) as ResolvedOptions<K>
}

export function resolveRules(value: Linter.Config[]): RuleOptions {
  const rules = {}

  for (const config of value) if (config.rules) Object.assign(rules, config.rules)

  return rules
}
