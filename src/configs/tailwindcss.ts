import tailwindcssPlugin from 'eslint-plugin-better-tailwindcss'

import { FlatConfigItem } from '../types'

export default function tailwindcss(): FlatConfigItem[] {
  return [
    {
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
