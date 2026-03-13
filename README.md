## eslint-config

自用 ESLint 配置，站在 [zjutjh/eslint-config](https://github.com/zjutjh/eslint-config) 的肩膀上，采用了很多比较激进的规则

## 使用方法

首先确保安装了 ESLint

安装 jiti 如果你使用 typescript，如果是 bun 运行时则不需要

```shell
npm add -D eslint jiti
npm add -D @promise2/eslint-config
```

在项目根目录创建 `eslint.config.ts` 文件，复制粘贴下面的代码：

```typescript
import promise from '@promise2/eslint-config'

export default promise()
```

然后就可以使用啦

## 自定义配置

```typescript
import promise from '@promise2/eslint-config'

export default promise({
    // 启用相关规则，默认会自动检测是否需要启用
    enable: {
        ts: true,
        vue: true,
        // prettier 相关配置
        prettier: {
            semi: false,
            printWidth: 120
        }
    },
    // 忽略路径
    ignores: ['**/*.ts'],
    // ESLint 规则覆盖
    rules: {
        'no-console': 'off'
    }
})
```
