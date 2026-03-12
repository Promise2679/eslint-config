import { OptionsConfig } from './types'

type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>

export function resolveSubOptions<K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K
): ResolvedOptions<OptionsConfig[K]> {
  if (typeof options[key] === 'boolean') return {} as ResolvedOptions<boolean>
  return (options[key] || {}) as ResolvedOptions<OptionsConfig[K]>
}
