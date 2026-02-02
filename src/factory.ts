import { isPackageExists } from 'local-pkg'

import ignores from './configs/ignores'
import javascript from './configs/javascript'
import misc from './configs/misc'
import prettier from './configs/prettier'
import sort from './configs/sort'
import typescript from './configs/typescript'
import unicorn from './configs/unicorn'
import vue from './configs/vue'
import { OptionsConfig } from './types'
import { resolveSubOptions } from './utils'

export default async function promise(options: OptionsConfig = {}) {
  const { enable = {}, ignores: userIgnores = [], prettier: enablePrettier = true, rules } = options
  const { ts: enableTs = isPackageExists('typescript'), vue: enableVue = isPackageExists('vue') } = enable

  const configs = [ignores(userIgnores), javascript(), misc(enableTs), sort(), unicorn(enableTs)]

  if (enableTs) configs.push(await typescript())

  if (enableVue) configs.push(await vue(enableTs))

  if (rules) configs.push([{ name: 'overrides', rules }])

  // 放到最后，eslint-config-prettier 需要覆盖一些冲突的配置
  const codeStyleOptions = resolveSubOptions(options, 'prettier')
  if (enablePrettier) configs.push(await prettier(codeStyleOptions))

  return configs.flat()
}
