import typegen from 'eslint-typegen'

import promise from '../src'

const configs = promise({
  enable: {
    react: true,
    sort: true,
    tailwindcss: true,
    ts: true,
    vue: true
  }
})

await typegen(configs, { dtsPath: 'src/typegen.d.ts' })
