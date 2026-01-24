import sonarjsPlugin from 'eslint-plugin-sonarjs';
import { FlatConfigItem } from 'src/types';

export default function misc(): FlatConfigItem[] {
  return [
    {
      name: 'sonarjs',
      plugins: { sonarjs: sonarjsPlugin },
      rules: { ...(sonarjsPlugin.configs.recommended.rules as FlatConfigItem['rules']) }
    }
  ];
}
