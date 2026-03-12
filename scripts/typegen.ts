import { Linter } from 'eslint'
import typegen from 'eslint-typegen'

import promise from '../src'

const configs = promise({ enable: { ts: true, vue: true } })

await typegen(configs as Linter.Config[], { dtsPath: 'src/typegen.d.ts' })
