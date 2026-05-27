# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 概述

`@promise2/eslint-config` — 个人 ESLint Flat Config 配置包，将 13 个插件组合为一个工厂函数，支持依赖自动检测。

## 常用命令

```bash
pnpm build        # 使用 tsdown 构建（输出目录：dist/）
pnpm lint         # 运行 ESLint（Flat Config，使用自身配置）
pnpm typecheck    # tsc --noEmit 类型检查
pnpm typegen      # 从插件配置生成规则类型（jiti scripts/typegen.ts → src/typegen.d.ts）
```

CI 流程依次执行：typegen → lint → typecheck（无测试套件）。

## 架构

主导出为 `src/factory.ts` 中的 `promise()` 工厂函数，流程如下：

1. 接收 `OptionsConfig`（启用开关、忽略路径、规则覆盖）
2. 通过 `local-pkg`（`isPackageExists`）自动检测已安装的依赖，决定启用哪些插件配置（TypeScript、React、Vue/Nuxt、Tailwind CSS）
3. 依次调用 `src/configs/` 下各配置模块，组合为 `FlatConfigItem[]` 数组
4. Prettier 配置放在最后追加（eslint-config-prettier 需要覆盖冲突规则）

`src/configs/` 下每个文件导出一个函数，返回对应插件的 `FlatConfigItem[]`。导入排序策略可在 `perfectionist` 和 `simple-import-sort` 之间切换。

`src/typegen.d.ts` 由 `eslint-typegen` 自动生成 — 添加或修改插件规则后需运行 `pnpm typegen` 重新生成类型。

## 关键约定

- **pnpm workspace + catalogs** — 依赖版本通过 `pnpm-workspace.yaml` 中的 `catalog:` 协议统一管理
- **Pre-commit 钩子** — `simple-git-hooks` + `nano-staged`，提交前对暂存的 `.ts` 文件运行 ESLint
- **仅 ESM** — 包输出格式为 ESM（tsdown 配置中 `format: ['esm']`）
- **Node >= 22.18.0**
