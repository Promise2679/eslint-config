import { isPackageExists } from 'local-pkg'

import ignores from './configs/ignores'
import importX from './configs/import-x'
import javascript from './configs/javascript'
import misc from './configs/misc'
import prettier from './configs/prettier'
import react from './configs/react'
import { perfectionist, simpleImportSort } from './configs/sort'
import { tailwindcss } from './configs/tailwindcss'
import typescript from './configs/typescript'
import unicorn from './configs/unicorn'
import vue from './configs/vue'
import { yml } from './configs/yml'
import { FlatConfigItem, OptionsConfig } from './types'
import { resolveOptions } from './utils'

export default function promise(options: OptionsConfig = {}): FlatConfigItem[] {
  const { enable = {}, ignores: userIgnores = [], rules } = options
  const {
    prettier: enablePrettier = true,
    react: enableReact = isPackageExists('react'),
    sort: enableSort = 'perfectionist',
    tailwindcss: enableTailwindcss = isPackageExists('tailwindcss'),
    ts: enableTs = isPackageExists('typescript'),
    vue: enableVue = isPackageExists('vue') || isPackageExists('nuxt')
  } = enable

  const configs = [ignores(userIgnores), javascript(), misc(), importX(), unicorn(), yml()]

  switch (enableSort) {
    case 'perfectionist':
      configs.push(perfectionist())
      break
    case 'simple-import-sort':
      configs.push(simpleImportSort())
      break
    case true:
      configs.push(perfectionist(), simpleImportSort())
      break
  }

  if (enableTailwindcss) configs.push(tailwindcss())
  if (enableTs) configs.push(typescript())
  if (enableVue) configs.push(vue(enableTs))
  if (enableReact) configs.push(react())
  if (rules) configs.push([{ name: 'overrides', rules }])

  // 放到最后，eslint-config-prettier 需要覆盖一些冲突的配置
  const codeStyleOptions = resolveOptions(enablePrettier)
  if (enablePrettier) configs.push(prettier(codeStyleOptions))

  return configs.flat()
}
