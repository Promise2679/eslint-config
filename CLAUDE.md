# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

`@promise2/eslint-config` 是一个发布到 npm 的个人 ESLint 预设包，基于 ESLint Flat Config。导出一个 `promise(options)` 工厂函数，按需组合多个插件配置。通过 `local-pkg` 自动检测使用方项目是否安装了 `typescript` / `react` / `vue`(或 `nuxt`) / `tailwindcss`，智能启用对应规则。

## 常用命令

- `pnpm build` — 用 tsdown 打包到 `dist/`（仅 ESM + `.d.mts`）
- `pnpm lint` — 用本仓库自身的配置对自己做 lint（dogfooding，配置见 [eslint.config.ts](eslint.config.ts)）
- `pnpm typecheck` — `tsc --noEmit` 类型检查
- `pnpm typegen` — 运行 [scripts/typegen.ts](scripts/typegen.ts) 生成 [src/typegen.d.ts](src/typegen.d.ts)，为所有插件规则提供类型。**改动了启用的插件/规则集合后必须重跑**，否则 `RuleOptions` 类型与实际规则不同步
- `pnpm preview` — 启动 `@eslint/config-inspector` 可视化查看最终配置

CI（[.github/workflows](.github/workflows)）依次执行 `typegen → lint → typecheck`，发布流程额外加 `build`。无单元测试。提交前 `simple-git-hooks` + `nano-staged` 会对 `*.ts` 跑 `eslint --fix`。

## 架构

**入口链**：[src/index.ts](src/index.ts) 仅 re-export → [src/factory.ts](src/factory.ts) 的 `promise()` 工厂。

**工厂职责**（[src/factory.ts](src/factory.ts)）：
1. 解析 `options.enable`，对未显式设置的开关用 `isPackageExists()` 自动检测。
2. 构造 `ConfigContext`（`{ esYear, ts }`），传给每个 config 模块。
3. 按固定顺序 push 各 config 数组；`sort` 选项在 `perfectionist`(默认) / `simple-import-sort` / 二者都开(仅测试用) 间切换。
4. 末尾追加 `ignores`、用户 `rules` 覆盖，**最后**追加 prettier（`eslint-config-prettier` 需覆盖冲突规则）。
5. `return configs.flat()`。

**Config 模块**（[src/configs/](src/configs/)）：每个文件默认导出 `(ctx: ConfigContext) => FlatConfigItem[]`，对应一个插件。新增插件 = 在此加一个文件 + 在 factory 中接线。三种规则来源写法：
- 直接内联规则对象（如 [typescript.ts](src/configs/typescript.ts)、[javascript.ts](src/configs/javascript.ts)）。
- `resolveRules(plugin.configs[...])` —— 把插件预设里多个 config 的 `rules` 扁平合并（见 [src/utils.ts](src/utils.ts)，用于 [vue.ts](src/configs/vue.ts)、[yml.ts](src/configs/yml.ts)）。
- `gateRules(esYear, table)` —— 按 ES 年份开关规则（见 [unicorn.ts](src/configs/unicorn.ts)）。

**ES 年份门控**（[src/utils.ts](src/utils.ts)）：`resolveProjectEsYear()` 读取使用方 `tsconfig` 的 `lib`/`target` 推导 ES 年份（无证据默认 2022，`esnext` 视为 `Infinity`）；`gateRules()` 据此把高版本才支持的规则关掉，避免对旧目标环境误报。

**类型系统**：
- [src/types.ts](src/types.ts) 定义 `OptionsConfig`(对外 API)、`ConfigContext`、`FlatConfigItem`、`RulesTable`。
- [src/typegen.d.ts](src/typegen.d.ts) 是**生成产物**（由 `pnpm typegen` 用 `eslint-typegen` 生成），提供全部插件规则的 `RuleOptions` 类型。不要手改。

**Glob 常量**（[src/globs.ts](src/globs.ts)）：所有 `files`/`ignores` 匹配统一引用此处常量（`GLOB_TS`、`GLOB_VUE` 等、`GLOBS_EXCLUDES`），勿在各 config 内硬编码 glob。

## 约定

- 依赖版本统一走 pnpm catalog（[pnpm-workspace.yaml](pnpm-workspace.yaml) 的 `catalog:` / `catalogs:`），`package.json` 里写 `catalog:xxx` 而非具体版本号。增删依赖需同步改这两处。
- 代码风格由自身 prettier 配置约束：无分号、单引号、`printWidth: 120`、`arrowParens: 'avoid'`、`trailingComma: 'none'`（见 [src/configs/prettier.ts](src/configs/prettier.ts)）。
- 仅发布 `dist/`（`package.json` 的 `files`）。
- 每次改动需同步更新相关文档（README、CLAUDE.md 等），保持文档与实现一致。
