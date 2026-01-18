import { isPackageExists } from 'local-pkg';

import ignores from './configs/ignores';
import imports from './configs/imports';
import javascript from './configs/javascript';
import misc from './configs/misc';
import prettier from './configs/prettier';
import typescript from './configs/typescript';
import vue from './configs/vue';
import type { FlatConfigItem } from './types';
import { OptionsConfig } from './types';
import { getOverrides, resolveSubOptions } from './utils';

export default async function zjutjh(
  options: OptionsConfig = {},
  ...userConfigs: FlatConfigItem[]
): Promise<FlatConfigItem[]> {
  const {
    componentExts = [],
    vue: enableVue = isPackageExists('vue'),
    ts: enableTs = isPackageExists('typescript'),
    ignores: userIgnores,
    prettier: enablePrettier = true
  } = options;

  const configs: FlatConfigItem[][] = [ignores({ userIgnores }), javascript(), imports(), misc()];

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
    configs.push(await vue({ ts: Boolean(enableTs), overrides: getOverrides(options, 'vue') }));
  }

  // 放到最后，eslint-config-prettier 需要覆盖一些冲突的配置
  const codeStyleOptions = resolveSubOptions(options, 'prettier');
  if (enablePrettier) configs.push(await prettier(codeStyleOptions));

  return [...configs.flat(), ...userConfigs] as FlatConfigItem[];
}
