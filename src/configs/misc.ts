import { Linter } from 'eslint';
import uniconPlugin from 'eslint-plugin-unicorn';

export default function misc(): Linter.Config[] {
  return [
    { name: 'zjutjh/misc/setup', plugins: { unicorn: uniconPlugin } },
    {
      name: 'zjutjh/misc/rules',
      rules: {
        'unicorn/filename-case': ['error', { case: 'kebabCase' }],
        'unicorn/better-regex': 'error',
        'unicorn/escape-case': ['error', 'uppercase'],
        'unicorn/new-for-builtins': 'error',
        'unicorn/no-console-spaces': 'error',
        'unicorn/no-for-loop': 'error',
        'unicorn/no-immediate-mutation': 'error',
        'unicorn/no-lonely-if': 'error',
        'unicorn/no-negated-condition': 'error',
        'unicorn/no-negation-in-equality-check': 'error',
        'unicorn/no-new-array': 'error',
        'unicorn/no-unnecessary-array-flat-depth': 'error',
        'unicorn/prefer-array-flat-map': 'error',
        'unicorn/prefer-array-index-of': 'error',
        'unicorn/prefer-array-some': 'error',
        'unicorn/prefer-includes': 'error',
        'unicorn/prefer-math-min-max': 'error',
        'unicorn/prefer-modern-math-apis': 'error',
        'unicorn/prefer-negative-index': 'error',
        'unicorn/prefer-single-call': 'error',
        'unicorn/prefer-spread': 'error',
        'unicorn/prefer-string-slice': 'error',
        'unicorn/relative-url-style': 'error'
      }
    }
  ];
}
