import { Linter } from 'eslint';
import typegen from 'eslint-typegen';

import promise from '../src';

const configs = await promise({ ts: true, vue: true });

typegen(configs as Linter.Config[], { dtsPath: 'src/typegen.d.ts' });
