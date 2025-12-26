---
title: 为什么 ESM 不允许省略扩展名
date: 2025-11-01
category: 前端
tags: [前端, ESM]
---

核心原因：**ESM 的设计目标是确定性（Determinism）**

ESM 模块系统是由 JavaScript 语言规范（ECMA262）定义的，不再是 Node.js 的私有机制。

> 它的设计目标是：**模块解析必须在静态分析阶段完全确定。**

也就是说：

- 浏览器或 Node 必须能在**编译阶段（import 语句还没执行）**，**明确知道要加载哪个文件**。
- 不允许像 CommonJS 那样在运行时再去“试探式”加载 `.js`、`.json`、`.node`。

## CommonJS 的“模糊查找”问题

在 CommonJS (`require()`) 中，Node 会自动尝试：

```bash
require('./foo')
→ 尝试 ./foo.js
→ 尝试 ./foo.json
→ 尝试 ./foo.node
→ 如果是目录，再尝试 ./foo/index.js ...
```

这种“多路径尝试”的行为意味着：

- **运行时才知道实际加载哪个文件**；
- **无法在静态分析时确定依赖关系图**；
- 导致工具（如 bundler、tree-shaking）无法提前优化。

## ESM 必须支持“静态分析”

ESM 语法（`import/export`）的一个重大优势是——**可被静态分析**：

```js
import { foo } from './utils.js';
```

静态分析意味着：

- 工具（如 webpack、Rollup、Vite）在不执行代码的情况下能解析依赖树；
- 浏览器能并行预加载依赖（HTTP/2 push / preload）；
- 不需要像 CommonJS 那样动态执行 `require()` 才知道依赖关系。

💡 如果扩展名可以省略，就必须在运行时再去尝试多个文件名，静态分析就不可能做到。

## 🧩 浏览器环境的约束

别忘了——ESM 最早是为 **浏览器环境** 设计的，而不是 Node.js。
浏览器加载模块时用的是 URL：

```js
<script type="module" src="./main.js"></script>;
import './utils.js';
```

在浏览器里，URL 必须是精确可解析的资源路径。
比如 `./utils` → 这不是一个合法资源，服务器不知道该返回哪个文件。
而 `./utils.js` 则是明确的文件路径。

> 所以浏览器规范从一开始就要求：**import 必须带文件扩展名或明确映射。**

Node.js 只是后来为了兼容这个规范才引入 ESM。

## Node.js ESM 的解析逻辑

Node.js 在实现 ESM 时遵循规范，不允许模糊加载：

```js
// ❌ 会报错
import { foo } from './utils';

// ✅ 正确写法
import { foo } from './utils.js';
```

如果你不想写扩展名，可以通过以下方式定制解析：

### 方法 1：使用 `"imports"` 或 `"exports"` 字段

在 `package.json` 中定义别名映射：

```json
{
  "imports": {
    "#utils": "./src/utils/index.js"
  }
}
```

然后你可以这样导入：

```js
import '#utils';
```

### 方法 2：使用构建工具（Vite / Webpack / TS）

这些工具在构建时会帮你自动补扩展名或解析路径，比如：

```js
import './utils';
```

→ 构建后会转成 `import './utils.js'`。

## 设计哲学：ESM 要求“零歧义”

总结来说，ESM 的“不省略扩展名”不是“功能限制”，而是“设计哲学”：

| 特性             | CommonJS   | ESM                         |
| ---------------- | ---------- | --------------------------- |
| 加载时机         | 运行时动态 | 编译期静态                  |
| 模块定位         | 模糊匹配   | 精确匹配                    |
| 可静态分析       | ❌ 不行    | ✅ 可以                     |
| 支持浏览器       | ❌ 不支持  | ✅ 原生支持                 |
| 是否可省略扩展名 | ✅ 可以    | ❌ 不行（除非构建工具处理） |

## 小结

> **ESM 不支持省略扩展名，是为了保证模块解析的“确定性”和“可静态分析性”。**
> 它放弃了一点灵活性，换来了跨平台一致性和更好的工具支持。
