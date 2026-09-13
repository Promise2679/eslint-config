import { Linter } from 'eslint'
import typegen from 'eslint-typegen'

import promise from '../src'

const configs = (await promise({
  enable: {
    react: true,
    sort: true,
    tailwindcss: true,
    vue: true
  }
})) as Linter.Config[]

await typegen(configs, { dtsPath: 'src/typegen.d.ts' })
