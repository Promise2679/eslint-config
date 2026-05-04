import typegen from 'eslint-typegen'

import promise from '../src'

const configs = promise({ enable: { sort: true, ts: true, vue: true } })

await typegen(configs, { dtsPath: 'src/typegen.d.ts' })
