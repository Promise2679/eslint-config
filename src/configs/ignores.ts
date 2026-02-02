import { GLOBS_EXCLUDES } from '../globs'
import { FlatConfigItem } from '../types'

export default function ignores(userIgnores: string[]): FlatConfigItem[] {
  return [{ ignores: [...GLOBS_EXCLUDES, ...userIgnores], name: 'ignores' }]
}
