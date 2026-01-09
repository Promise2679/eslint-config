import { GLOB_JSX, GLOB_TSX } from '../globs';
import type { FlatConfigItem } from '../types';

export default function jsx(): FlatConfigItem[] {
  return [
    {
      name: 'zjutjh/jsx/setup',
      files: [GLOB_TSX, GLOB_JSX],
      languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } }
    }
  ] satisfies FlatConfigItem[];
}
