import { Linter } from 'eslint'
import sonarjsPlugin from 'eslint-plugin-sonarjs'

import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX, GLOB_VUE } from '../globs'
import { ConfigContext, FlatConfigItem } from '../types'

export default function sonarjs(_ctx: ConfigContext): FlatConfigItem[] {
  return [
    {
      files: [GLOB_JS, GLOB_TS, GLOB_JSX, GLOB_TSX, GLOB_VUE],
      name: 'sonarjs',
      plugins: { sonarjs: sonarjsPlugin },
      rules: {
        ...(sonarjsPlugin.configs?.recommended as Linter.Config).rules,
        'sonarjs/cognitive-complexity': 'off',
        'sonarjs/concise-regex': 'off',
        'sonarjs/deprecation': 'off',
        'sonarjs/function-return-type': 'off',
        'sonarjs/no-clear-text-protocols': 'off',
        'sonarjs/no-dead-store': 'off',
        'sonarjs/no-hardcoded-passwords': 'off',
        // 与 unicorn/no-negated-comparison 重复
        'sonarjs/no-inverted-boolean-check': 'off',
        'sonarjs/no-misleading-array-reverse': 'off',
        'sonarjs/no-nested-functions': 'off',
        // 有误报，先暂时关掉
        'sonarjs/no-redundant-optional': 'off',
        'sonarjs/no-unused-collection': 'off',
        'sonarjs/no-unused-vars': 'off',
        'sonarjs/prefer-regexp-exec': 'off',
        'sonarjs/pseudo-random': 'warn',
        'sonarjs/reduce-initial-value': 'off',
        'sonarjs/slow-regex': 'warn',
        'sonarjs/super-linear-regex': 'off',
        'sonarjs/todo-tag': 'off',
        'sonarjs/unused-import': 'off'
      }
    }
  ]
}
