import { ResolvedOptions } from './types'

export function resolveOptions<K>(value: K): ResolvedOptions<K> {
  if (typeof value === 'boolean') return {} as ResolvedOptions<K>
  return (value || {}) as ResolvedOptions<K>
}
