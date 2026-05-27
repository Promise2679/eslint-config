import tailwindcssPlugin from 'eslint-plugin-better-tailwindcss'

import { GLOB_JSX, GLOB_TSX, GLOB_VUE } from '../globs'
import { FlatConfigItem } from '../types'

export default function tailwindcss(): FlatConfigItem[] {
  return [
    {
      files: [GLOB_JSX, GLOB_TSX, GLOB_VUE],
      name: 'tailwindcss',
      plugins: { 'better-tailwindcss': tailwindcssPlugin },
      rules: {
        ...tailwindcssPlugin.configs.recommended.rules,
        'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
        'better-tailwindcss/no-unknown-classes': 'off'
      }
    }
  ]
}
