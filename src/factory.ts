import { isPackageExists } from 'local-pkg'

import ignores from './configs/ignores'
import javascript from './configs/javascript'
import misc from './configs/misc'
import prettier from './configs/prettier'
import sort from './configs/sort'
import typescript from './configs/typescript'
import unicorn from './configs/unicorn'
import vue from './configs/vue'
import { FlatConfigItem, OptionsConfig } from './types'
import { resolveOptions } from './utils'

export default function promise(options: OptionsConfig = {}): FlatConfigItem[] {
  const { enable = {}, ignores: userIgnores = [], rules } = options
  const {
    prettier: enablePrettier = true,
    ts: enableTs = isPackageExists('typescript'),
    vue: enableVue = isPackageExists('vue') || isPackageExists('nuxt')
  } = enable

  const configs = [ignores(userIgnores), javascript(), misc(enableTs), sort(), unicorn(enableTs)]

  if (enableTs) configs.push(typescript())

  if (enableVue) configs.push(vue(enableTs))

  if (rules) configs.push([{ name: 'overrides', rules }])

  // 放到最后，eslint-config-prettier 需要覆盖一些冲突的配置
  const codeStyleOptions = resolveOptions(enablePrettier)
  if (enablePrettier) configs.push(prettier(codeStyleOptions))

  return configs.flat()
}
