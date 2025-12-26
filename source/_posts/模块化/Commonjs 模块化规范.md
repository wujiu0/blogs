---
title: Commonjs 模块化规范
date: 2025-11-01
category: 前端
tags: [前端, 模块化, CommonJS]
---

## 模块的基本结构

每个文件就是一个模块（有独立的作用域），模块通过以下两个核心对象进行交互：

| 对象             | 作用                                   |
| ---------------- | -------------------------------------- |
| `module.exports` | 模块导出接口对象（真正导出的内容）     |
| `exports`        | 对 `module.exports` 的引用（便捷写法） |
| `require()`      | 用于导入其他模块                       |

## 导出（Exports）

### 方式一：导出单个对象 / 函数

```js
// math.js
module.exports = function add(a, b) {
  return a + b;
};
```

```js
const add = require('./math');
console.log(add(2, 3)); // 5
```

### 方式二：导出多个属性

```js
// math.js
exports.add = (a, b) => a + b;
exports.sub = (a, b) => a - b;
```

```js
const math = require('./math');
console.log(math.add(2, 3)); // 5
```

⚠️ 注意：

```js
exports = { add() {} }; // ❌ 无效，会断开引用
```

## 导入

`require()` 是同步函数，用于加载并执行模块。
它会返回 `module.exports` 导出的对象。

```js
const fs = require('fs'); // 内置模块
const math = require('./math.js'); // 文件模块
const _ = require('lodash'); // 第三方模块
```

## 模块解析与加载流程

Node.js 加载模块时按以下顺序解析：

1. `require(x)`
2. 如果 x 是核心模块 → 直接返回核心模块
3. 如果 x 是以 './'、'../'、'/' 开头 → 作为文件或目录解析
   `require('./foo')
   1. 尝试加载文件 `./foo.js` → `./foo.json` → `./foo.node`
   2. 若 `./foo` 是一个目录：
      - 查找 `./foo/package.json` 中的 `"main"` 字段（如 `"main": "index.js"`）
      - 如果没有 `package.json` 或找不到 `"main"`，则加载： `./foo/index.js` → `./foo/index.json` → `./foo/index.node`
4. 否则 → 作为第三方模块（从 node_modules 查找）
   Node 会按**目录层级逐级向上查找 `node_modules`**，直到文件系统根目录：找到模块后与*作为文件/目录解析*规则相同
5. 找不到 → 抛出 `MODULE_NOT_FOUND` 错误

> 加载后会缓存到 `require.cache`，后续重复导入直接复用。

## 模块缓存机制

Node 在加载模块时，会将结果**缓存**到 `require.cache` 中：

```js
const a = require('./a');
const b = require('./a');
console.log(a === b); // true，同一个实例
```

- 模块只会加载执行一次；
- 下次 `require` 时直接从缓存中取；
- 可通过 `delete require.cache[require.resolve('./a')]` 清除缓存。

### 原理

Node.js 只会**加载并执行模块一次**，结果会缓存。

```js
// a.js
console.log('a loaded');
module.exports = { x: 1 };

// main.js
require('./a'); // 打印 a loaded
require('./a'); // 不再打印
```

### 查看缓存

```js
console.log(require.cache);
```

### 清除缓存

```js
delete require.cache[require.resolve('./a')];
```

## 模块加载与包装

[[CommonJS 模块加载与包装 |具体描述]]

Node.js 在执行模块前，会用一个函数包装它：

```js
(function (exports, require, module, __filename, __dirname) {
  // 模块代码
});
```

因此每个模块都有自己的作用域，天然避免了全局变量污染。
同时可以使用：

- `__filename`：当前模块文件的绝对路径

- `__dirname`：当前模块目录的绝对路径

## 循环依赖（Circular Dependency）

CommonJS 模块加载是**值的拷贝 + 执行时加载（同步）**，
所以循环依赖时会出现“部分导出”的情况。

示例：

```js
// a.js
exports.done = false;
const b = require('./b');
console.log('b.done =', b.done);
exports.done = true;

// b.js
exports.done = false;
const a = require('./a');
console.log('a.done =', a.done);
exports.done = true;
```

输出顺序：

```
a → b → a（中断）
a.done = false
b.done = true
```

解释：

> 当发生循环引用时，第二次 `require()` 会从缓存中取到“未完成导出”的对象。

## commonJS 与 ESM 解析差异

| 特点                | CommonJS        | ESM                                 |
| ------------------- | --------------- | ----------------------------------- |
| 文件扩展名          | 可省略          | **必须写明扩展名**（如 `./foo.js`） |
| 目录加载            | 支持 `index.js` | ❌ 不支持（必须明确文件路径）       |
| `package.json` 字段 | `"main"`        | `"exports"`（优先级更高）           |

`"exports"` 字段允许模块作者限制外部可导入的路径，比如：

```json
{
  "name": "mypkg",
  "exports": {
    ".": "./src/index.js",
    "./utils": "./src/utils.js"
  }
}
```

[[为什么 ESM 不允许省略扩展名|why ?]]

## 最佳实践与建议

| 目标                 | 推荐写法                               |
| -------------------- | -------------------------------------- |
| 导出多个方法         | 使用 `exports.xxx = ...`               |
| 导出单个类/函数/对象 | 使用 `module.exports = ...`            |
| 避免歧义             | 不要混用 `exports` 和 `module.exports` |
| 保持性能             | 尽量避免频繁清空缓存                   |
| 向 ESM 迁移          | 使用 `import`/`export`，或混合支持     |
