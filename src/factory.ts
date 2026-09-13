import { isPackageExists } from 'local-pkg'

import type { ConfigContext, FlatConfigItem, OptionsConfig } from './types'

import importX from './configs/import-x'
import javascript from './configs/javascript'
import regexp from './configs/regexp'
import unicorn from './configs/unicorn'
import yml from './configs/yml'
import { GLOBS_EXCLUDES } from './globs'
import { resolveProjectEsYear } from './utils'

export default async function promise(options: OptionsConfig = {}): Promise<FlatConfigItem[]> {
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
  const configs = [javascript(ctx), importX(ctx), unicorn(ctx), yml(ctx), regexp(ctx)]

  switch (enableSort) {
    case 'perfectionist': {
      const { default: perfectionist } = await import('./configs/perfectionist')
      configs.push(perfectionist(ctx))
      break
    }
    case 'simple-import-sort': {
      const { default: simpleImportSort } = await import('./configs/simple-import-sort')
      configs.push(simpleImportSort(ctx))
      break
    }
    case true: {
      const [{ default: perfectionist }, { default: simpleImportSort }] = await Promise.all([
        import('./configs/perfectionist'),
        import('./configs/simple-import-sort')
      ])
      configs.push(perfectionist(ctx), simpleImportSort(ctx))
      break
    }
  }

  if (enableTailwindcss) {
    const { default: tailwindcss } = await import('./configs/tailwindcss')
    configs.push(tailwindcss(ctx))
  }

  if (enableTs) {
    const { default: typescript } = await import('./configs/typescript')
    configs.push(typescript(ctx))
  }

  if (enableVue) {
    const { default: vue } = await import('./configs/vue')
    configs.push(vue(ctx))
  }

  if (enableReact) {
    const { default: react } = await import('./configs/react')
    configs.push(react(ctx))
  }

  if (enablePrettier) {
    const { default: prettier } = await import('./configs/prettier')
    configs.push(prettier(enablePrettier === true ? {} : enablePrettier))
  }

  if (rules) {
    configs.push({ name: 'overrides', rules })
  }

  configs.push({ ignores: [...GLOBS_EXCLUDES, ...userIgnores], name: 'ignores' })
  return configs
}
