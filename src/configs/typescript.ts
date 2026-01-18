import { GLOB_TS, GLOB_TSX } from '../globs';
import {
  FlatConfigItem,
  OptionsComponentExts,
  OptionsOverrides,
  OptionsTypeScriptParserOptions
} from '../types';
import { ensurePackages, interopDefault } from '../utils';

export default async function typescript(
  options: OptionsOverrides & OptionsTypeScriptParserOptions & OptionsComponentExts
): Promise<FlatConfigItem[]> {
  const { componentExts = [], overrides, parserOptions } = options;

  const files = [GLOB_TS, GLOB_TSX, ...componentExts.map((ext) => `**/*.${ext}`)];

  await ensurePackages(['@typescript-eslint/eslint-plugin', '@typescript-eslint/parser']);

  const [pluginTs, parserTs] = await Promise.all([
    await interopDefault(import('@typescript-eslint/eslint-plugin')),
    await interopDefault(import('@typescript-eslint/parser'))
  ] as const);

  return [
    {
      name: 'typescript/setup',
      plugins: { '@typescript-eslint': pluginTs },
      files,
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          ecmaVersion: 2022,
          sourceType: 'module',
          projectService: { allowDefaultProject: ['./*.js'], defaultProject: './tsconfig.json' },
          tsconfigRootDir: process.cwd(),
          ...parserOptions
        }
      },
      rules: {
        ...pluginTs.configs.strict.rules,
        '@typescript-eslint/no-unused-expressions': [
          'error',
          { allowShortCircuit: true, allowTaggedTemplates: true, allowTernary: true }
        ],
        ...overrides
      }
    }
  ];
}
