import { isPackageExists } from 'local-pkg';

import type { FlatConfigItem } from './types';

import ignores from './configs/ignores';
import imports from './configs/imports';
import javascript from './configs/javascript';
import prettier from './configs/prettier';
import typescript from './configs/typescript';
import unicorn from './configs/unicorn';
import vue from './configs/vue';
import { OptionsConfig } from './types';
import { getOverrides, resolveSubOptions } from './utils';

export default async function zjutjh(
  options: OptionsConfig = {},
  ...userConfigs: FlatConfigItem[]
): Promise<FlatConfigItem[]> {
  const {
    componentExts = [],
    ignores: userIgnores,
    prettier: enablePrettier = true,
    ts: enableTs = isPackageExists('typescript'),
    vue: enableVue = isPackageExists('vue')
  } = options;

  const configs: FlatConfigItem[][] = [
    ignores({ userIgnores }),
    javascript(),
    imports(),
    unicorn()
  ];

  if (enableVue) componentExts.push('vue');

  const typescriptOptions = resolveSubOptions(options, 'ts');
  if (enableTs) {
    configs.push(
      await typescript({
        ...typescriptOptions,
        componentExts,
        overrides: getOverrides(options, 'ts')
      })
    );
  }

  if (enableVue) {
    configs.push(await vue({ overrides: getOverrides(options, 'vue'), ts: Boolean(enableTs) }));
  }

  // 放到最后，eslint-config-prettier 需要覆盖一些冲突的配置
  const codeStyleOptions = resolveSubOptions(options, 'prettier');
  if (enablePrettier) configs.push(await prettier(codeStyleOptions));

  return [...configs.flat(), ...userConfigs] as FlatConfigItem[];
}
