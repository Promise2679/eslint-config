import sonarjsPlugin from 'eslint-plugin-sonarjs'
import { FlatConfigItem, OptionsOverrides } from 'src/types'

export default function misc(options?: OptionsOverrides): FlatConfigItem[] {
  const enableTs = options?.ts
  return [
    {
      name: 'sonarjs',
      plugins: { sonarjs: sonarjsPlugin },
      rules: {
        ...sonarjsPlugin.configs.recommended.rules,
        'sonarjs/cognitive-complexity': 'off',
        'sonarjs/concise-regex': 'off',
        'sonarjs/function-return-type': 'off',
        'sonarjs/no-clear-text-protocols': 'off',
        'sonarjs/no-dead-store': 'off',
        'sonarjs/no-hardcoded-passwords': 'off',
        'sonarjs/no-misleading-array-reverse': 'off',
        'sonarjs/no-nested-functions': 'off',
        'sonarjs/no-unused-vars': 'off',
        'sonarjs/prefer-regexp-exec': enableTs ? 'off' : 'error',
        'sonarjs/todo-tag': 'off',
        'sonarjs/unused-import': 'off'
      }
    }
  ]
}
