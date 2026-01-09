import { Linter } from 'eslint';
import typegen from 'eslint-typegen';

import zjutjh from '../src';

const configs = await zjutjh({ vue: true, react: true, jsx: true, ts: true });

typegen(configs as Linter.Config[], { dtsPath: 'src/typegen.d.ts' });
