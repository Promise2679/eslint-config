import { ParserOptions } from '@typescript-eslint/parser';
import { Linter } from 'eslint';
import { Options as PrettierOptions } from 'prettier';

import type { RuleOptions } from './typegen';

export type FlatConfigItem = Omit<Linter.Config, 'plugins' | 'rules'> & {
  plugins?: Record<string, unknown>;
  rules?: { [key: string]: Linter.RuleEntry } & RuleOptions;
};

export interface OverridesConfigs {
  vue?: Linter.RulesRecord;
  ts?: Linter.RulesRecord;
}

export interface OptionsConfig extends OptionsComponentExts {
  vue?: boolean;
  ts?: boolean | OptionsTypeScriptParserOptions;
  prettier?: boolean | OptionsPrettier;
  ignores?: string[];
  overrides?: OverridesConfigs;
}

export interface OptionsOverrides {
  overrides?: Linter.RulesRecord;
}

export interface OptionsComponentExts {
  componentExts?: string[];
}

export interface OptionsVue {
  ts: boolean;
}

export interface OptionsTypeScriptParserOptions {
  parserOptions?: Partial<ParserOptions>;
}

export interface OptionsPrettier {
  prettierSelfOptions?: PrettierOptions;
  /** 对哪些文件启用 prettier，默认全部启用 */
  lang?: {
    /** js, ts, vue 文件 */
    es: boolean;
    /** css, less, scss 文件 */
    css: boolean;
    html: boolean;
    /** json, json5, jsonc 文件 */
    json: boolean;
  };
}

export interface OptionsIgnores {
  userIgnores?: string[];
}
