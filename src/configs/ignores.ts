import { GLOBS_EXCLUDES } from '../globs'
import { FlatConfigItem, OptionsIgnores } from '../types'

export default function ignores(options?: OptionsIgnores): FlatConfigItem[] {
  return [{ ignores: [...GLOBS_EXCLUDES, ...(options?.userIgnores ?? [])], name: 'ignores' }]
}
