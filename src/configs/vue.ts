import { GLOB_VUE } from '../globs';
import { FlatConfigItem, OptionsOverrides, OptionsVue } from '../types';
import { ensurePackages, interopDefault } from '../utils';

export default async function vue(
  options?: OptionsVue & OptionsOverrides
): Promise<FlatConfigItem[]> {
  await ensurePackages(['eslint-plugin-vue', 'vue-eslint-parser']);

  const [pluginVue, parserVue] = await Promise.all([
    interopDefault(import('eslint-plugin-vue')),
    interopDefault(import('vue-eslint-parser'))
  ] as const);

  return [
    { name: 'zjutjh/vue/setup', plugins: { vue: pluginVue } },
    {
      name: 'zjutjh/vue/rules',
      files: [GLOB_VUE],
      languageOptions: {
        parser: parserVue,
        parserOptions: {
          ecmaFeatures: { jsx: true },
          extraFileExtensions: ['.vue'],
          parser: options?.ts ? await interopDefault(import('@typescript-eslint/parser')) : null,
          sourceType: 'module'
        }
      },
      processor: pluginVue.processors['.vue'],
      rules: {
        ...pluginVue.configs.essential.rules,
        'vue/prefer-true-attribute-shorthand': 'error',
        ...options?.overrides
      }
    }
  ];
}
