import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX } from '../globs';
import { FlatConfigItem, OptionsOverrides } from '../types';
import { ensurePackages, interopDefault } from '../utils';

export default async function react(options: OptionsOverrides): Promise<FlatConfigItem[]> {
  await ensurePackages([
    '@eslint-react/eslint-plugin',
    'eslint-plugin-react-hooks',
    'eslint-plugin-react-refresh'
  ]);

  const [pluginReact, pluginReactHooks, pluginReactRefresh] = await Promise.all([
    interopDefault(import('@eslint-react/eslint-plugin')),
    interopDefault(import('eslint-plugin-react-hooks')),
    interopDefault(import('eslint-plugin-react-refresh'))
  ]);

  return [
    {
      name: 'zjutjh/react/setup',
      plugins: {
        '@eslint-react': pluginReact,
        'react-hooks': pluginReactHooks,
        'react-refresh': pluginReactRefresh
      }
    },
    {
      name: 'zjutjh/react/rules',
      files: [GLOB_JSX, GLOB_TSX, GLOB_JS, GLOB_TS],
      rules: {
        ...pluginReact.configs.recommended.rules,
        ...pluginReactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': 'warn',
        '@eslint-react/no-leaked-conditional-rendering': 'error',
        '@eslint-react/no-missing-component-display-name': 'error',
        '@eslint-react/no-missing-context-display-name': 'error',
        ...options.overrides
      }
    }
  ] satisfies FlatConfigItem[];
}
