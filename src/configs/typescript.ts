import { GLOB_TS, GLOB_TSX } from '../globs'
import { FlatConfigItem, OptionsComponentExts, OptionsOverrides, OptionsTypeScriptParserOptions } from '../types'
import { ensurePackages, interopDefault } from '../utils'

export default async function typescript(
  options: OptionsComponentExts & OptionsOverrides & OptionsTypeScriptParserOptions
): Promise<FlatConfigItem[]> {
  const { componentExts = [], overrides, parserOptions } = options

  const files = [GLOB_TS, GLOB_TSX, ...componentExts.map(ext => `**/*.${ext}`)]

  await ensurePackages(['@typescript-eslint/eslint-plugin', '@typescript-eslint/parser'])

  const [pluginTs, parserTs] = await Promise.all([
    interopDefault(import('@typescript-eslint/eslint-plugin')),
    interopDefault(import('@typescript-eslint/parser'))
  ])

  return [
    {
      files,
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          ecmaVersion: 2022,
          projectService: { allowDefaultProject: ['./*.js'], defaultProject: './tsconfig.json' },
          sourceType: 'module',
          tsconfigRootDir: process.cwd(),
          ...parserOptions
        }
      },
      name: 'typescript/setup',
      plugins: { '@typescript-eslint': pluginTs },
      rules: {
        ...pluginTs.configs['strict-type-checked'].rules,
        ...pluginTs.configs['stylistic-type-checked'].rules,
        '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
        '@typescript-eslint/no-deprecated': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unused-expressions': [
          'error',
          { allowShortCircuit: true, allowTaggedTemplates: true, allowTernary: true }
        ],
        '@typescript-eslint/prefer-find': 'off',
        '@typescript-eslint/prefer-for-of': 'off',
        '@typescript-eslint/prefer-includes': 'off',
        '@typescript-eslint/prefer-promise-reject-errors': 'off',
        '@typescript-eslint/restrict-template-expressions': 'error',
        ...overrides
      }
    }
  ]
}
