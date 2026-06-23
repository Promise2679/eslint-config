import { Linter } from 'eslint'
import { getTsconfig } from 'get-tsconfig'

import { RuleOptions } from './typegen'
import { RulesTable } from './types'

/** 根据项目的 es 版本启用和关闭对应规则 */
export function gateRules(esYear: number, table: RulesTable): RuleOptions {
  const rules: RuleOptions = {}
  for (const [id, year] of Object.entries(table)) Object.assign(rules, { [id]: esYear < year ? 'off' : 'error' })

  return rules
}

/**
 * 读取项目 tsconfig 推导有效 ES 年份
 * 无证据时默认返回 2022
 */
export function resolveProjectEsYear() {
  const cwd = process.cwd()
  const compilerOptions = getTsconfig(cwd)?.config.compilerOptions
  if (!compilerOptions) return 2022

  if (compilerOptions.lib?.length) {
    const years = compilerOptions.lib.map(token => parseEsYear(token)).filter(year => !Number.isNaN(year))
    const year = years.length > 0 ? Math.max(...years) : undefined
    if (year !== undefined) return year
  }

  if (compilerOptions.target) {
    const year = parseEsYear(compilerOptions.target)
    if (!Number.isNaN(year)) return year
  }

  return 2022
}

export function resolveRules(value: Linter.Config[]): RuleOptions {
  const rules = {}
  for (const config of value) if (config.rules) Object.assign(rules, config.rules)

  return rules
}

/**
 * 将 tsconfig 的 lib/target 归一为 ES 年份
 * 非 ES token 返回 NaN。
 */
function parseEsYear(token: string) {
  const normalized = token.toLowerCase()
  if (normalized.startsWith('esnext')) return Infinity

  const match = /^es(\d+)/.exec(normalized)
  if (!match) return Number.NaN

  const num = Number(match[1])
  if (num >= 2015) return num
  // ES6->2015 ES7->2016
  if (num >= 6) return 2009 + num
  return num
}
