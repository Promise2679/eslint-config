import { isPackageExists } from 'local-pkg'

import importX from './configs/import-x'
import javascript from './configs/javascript'
import perfectionist from './configs/perfectionist'
import prettier from './configs/prettier'
import react from './configs/react'
import simpleImportSort from './configs/simple-import-sort'
import sonarjs from './configs/sonarjs'
import tailwindcss from './configs/tailwindcss'
import typescript from './configs/typescript'
import unicorn from './configs/unicorn'
import vue from './configs/vue'
import yml from './configs/yml'
import { GLOBS_EXCLUDES } from './globs'
import { ConfigContext, FlatConfigItem, OptionsConfig } from './types'
import { resolveProjectEsYear } from './utils'

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

  const ctx: ConfigContext = { esYear: resolveProjectEsYear(), ts: enableTs }
  const configs = [javascript(ctx), sonarjs(ctx), importX(ctx), unicorn(ctx), yml(ctx)]

  switch (enableSort) {
    case 'perfectionist':
      configs.push(perfectionist(ctx))
      break
    case 'simple-import-sort':
      configs.push(simpleImportSort(ctx))
      break
    case true:
      configs.push(perfectionist(ctx), simpleImportSort(ctx))
      break
  }

  if (enableTailwindcss) configs.push(tailwindcss(ctx))
  if (enableTs) configs.push(typescript(ctx))
  if (enableVue) configs.push(vue(ctx))
  if (enableReact) configs.push(react(ctx))

  configs.push([{ ignores: [...GLOBS_EXCLUDES, ...userIgnores], name: 'ignores' }])
  if (rules) configs.push([{ name: 'overrides', rules }])

  // 放到最后，eslint-config-prettier 需要覆盖一些冲突的配置
  const codeStyleOptions = typeof enablePrettier === 'boolean' ? {} : enablePrettier
  if (enablePrettier) configs.push(prettier(codeStyleOptions))

  return configs.flat()
}
