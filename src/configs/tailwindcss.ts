import tailwindcssPlugin from 'eslint-plugin-better-tailwindcss'

import { FlatConfigItem } from '../types'

export function tailwindcss(): FlatConfigItem[] {
  return [
    {
      name: 'tailwindcss',
      plugins: { 'better-tailwindcss': tailwindcssPlugin },
      rules: {
        ...tailwindcssPlugin.configs['recommended-error'].rules,
        'better-tailwindcss/enforce-consistent-line-wrapping': 'off'
      }
    }
  ]
}
