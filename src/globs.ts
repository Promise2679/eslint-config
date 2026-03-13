export const GLOB_VUE = '**/*.vue'

export const GLOB_JS = '**/*.?([cm])js'
export const GLOB_TS = '**/*.?([cm])ts'
export const GLOB_JSX = '**/*.?([cm])jsx'
export const GLOB_TSX = '**/*.?([cm])tsx'

/**
 * @see https://github.com/antfu/eslint-config/blob/04ae86dd43e86d8b925555d85adf080494efeab3/src/globs.ts#L56
 */
export const GLOBS_EXCLUDES = [
  '**/node_modules',
  '**/dist',
  '**/package.json',
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/bun.lockb',
  '**/output',
  '**/coverage',
  '**/temp',
  '**/.temp',
  '**/tmp',
  '**/.tmp',
  '**/.history',
  '**/.vitepress/cache',
  '**/.nuxt',
  '**/.next',
  '**/.svelte-kit',
  '**/.vercel',
  '**/.changeset',
  '**/.idea',
  '**/.cache',
  '**/.output',
  '**/.vite-inspect',
  '**/.yarn',
  '**/vite.config.*.timestamp-*',
  '**/CHANGELOG*.md',
  '**/*.min.*',
  '**/LICENSE*',
  '**/__snapshots__',
  '**/auto-import?(s).d.ts',
  '**/components.d.ts'
]
