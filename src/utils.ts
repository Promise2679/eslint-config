import { Linter } from 'eslint';
import { isPackageExists } from 'local-pkg';

import { OptionsConfig, OverridesConfigs } from './types';

export type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>;

type Awaitable<T> = Promise<T> | T;

export async function ensurePackages(packages: (string | undefined)[]): Promise<void> {
  const nonExistingPackages = packages.filter(i => i && !isPackageExists(i)) as string[];
  if (nonExistingPackages.length === 0) return;

  const p = await import('@clack/prompts');
  const confirmed = await p.confirm({
    message: `${nonExistingPackages.length === 1 ? 'Package is' : 'Packages are'} required for this config: ${nonExistingPackages.join(', ')}. Do you want to install them?`
  });

  if (confirmed) {
    const { installPackage } = await import('@antfu/install-pkg');
    await installPackage(nonExistingPackages, { dev: true });
  }
}

export function getOverrides<K extends keyof OverridesConfigs>(options: OptionsConfig, key: K): Linter.RulesRecord {
  return { ...options.overrides?.[key] };
}

export async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
  const resolved = (await m) as { default?: unknown };
  return (resolved.default || resolved) as T extends { default: infer U } ? U : T;
}

export function resolveSubOptions<K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K
): ResolvedOptions<OptionsConfig[K]> {
  if (typeof options[key] === 'boolean') return {} as ResolvedOptions<boolean>;
  return (options[key] || {}) as ResolvedOptions<OptionsConfig[K]>;
}
