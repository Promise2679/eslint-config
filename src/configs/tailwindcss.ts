import tailwindcssPlugin from 'eslint-plugin-better-tailwindcss'

import { GLOB_JSX, GLOB_TSX, GLOB_VUE } from '../globs'
import { ConfigFn } from '../types'

const tailwindcss: ConfigFn = _ctx => ({
  files: [GLOB_JSX, GLOB_TSX, GLOB_VUE],
  name: 'tailwindcss',
  plugins: { 'better-tailwindcss': tailwindcssPlugin },
  rules: {
    ...tailwindcssPlugin.configs.recommended.rules,
    'better-tailwindcss/enforce-consistent-line-wrapping': 'off',
    'better-tailwindcss/no-unknown-classes': 'off'
  }
})

export default tailwindcss
