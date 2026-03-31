import perfectionistPlugin from 'eslint-plugin-perfectionist'

import type { FlatConfigItem } from '../types'

export default function sort(): FlatConfigItem[] {
  return [
    {
      name: 'sort',
      plugins: { perfectionist: perfectionistPlugin },
      rules: perfectionistPlugin.configs['recommended-alphabetical'].rules as FlatConfigItem['rules']
    }
  ]
}
