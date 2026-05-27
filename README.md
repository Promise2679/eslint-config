# @promise2/eslint-config

个人 ESLint 配置，站在 [zjutjh/eslint-config](https://github.com/zjutjh/eslint-config) 的肩膀上。基于 ESLint Flat Config，集成常用插件，规则经过实战打磨，开箱即用。

## 特性

- **插件集成** — 集成了 13 个常用 ESLint 插件，覆盖代码质量、排序、格式化、框架规则等维度，无需逐个配置
- **实战打磨** — 规则设计基于真实项目使用反馈持续调整，在严格与实用之间取得平衡
- **环境自动检测** — 通过 `local-pkg` 自动检测项目依赖，智能启用 TypeScript、React、Vue、Tailwind CSS 等相关规则，零配置即可使用

## 快速开始

```shell
pnpm add -D eslint jiti @promise2/eslint-config
```

> 如果使用 Bun 运行时则不需要安装 `jiti`

在项目根目录创建 `eslint.config.ts`：

```typescript
import promise from '@promise2/eslint-config'

export default promise()
```

然后就可以使用啦

## 集成插件

| 类别 | 插件 |
|------|------|
| 基础 | `@eslint/js`、`eslint-plugin-unicorn`、`eslint-plugin-sonarjs` |
| TypeScript | `@typescript-eslint/eslint-plugin` |
| 框架 | `@eslint-react/eslint-plugin`、`eslint-plugin-vue` |
| 样式 | `eslint-plugin-better-tailwindcss` |
| 导入排序 | `eslint-plugin-perfectionist`、`eslint-plugin-simple-import-sort` |
| 导入规范 | `eslint-plugin-import-x` |
| 格式化 | `eslint-plugin-prettier`、`eslint-config-prettier` |
| 其他 | `eslint-plugin-yml` |

## 自动检测

以下依赖会被自动检测，无需手动启用：

| 依赖 | 检测条件 | 启用规则 |
|------|----------|----------|
| TypeScript | 安装了 `typescript` | TypeScript 严格类型检查规则 |
| React | 安装了 `react` | React 严格类型检查规则 |
| Vue | 安装了 `vue` 或 `nuxt` | Vue 推荐规则 |
| Tailwind CSS | 安装了 `tailwindcss` | Tailwind CSS 规则 |

## 自定义配置

```typescript
import promise from '@promise2/eslint-config'

export default promise({
    enable: {
        // 导入排序策略：'perfectionist'（默认）| 'simple-import-sort' | boolean（为 true 会同时启用，不建议）
        sort: 'perfectionist',
        // Prettier 配置：boolean 或 PrettierOptions 对象，详见 https://prettier.io/docs/options
        prettier: true,
        
    },
    // 忽略路径
    ignores: ['dist/**'],
    // ESLint 规则覆盖
    rules: {
        'no-console': 'off',
    },
})
```

### `enable` 选项说明

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `ts` | `boolean` | 自动检测 | TypeScript 规则 |
| `react` | `boolean` | 自动检测 | React 规则 |
| `vue` | `boolean` | 自动检测 | Vue 规则 |
| `tailwindcss` | `boolean` | 自动检测 | Tailwind CSS 规则 |
| `sort` | `'perfectionist'` \| `'simple-import-sort'` \| `boolean` | `'perfectionist'` | 导入排序策略 |
| `prettier` | `boolean` \| `PrettierOptions` | `true` | Prettier 格式化 |

## License

ISC
