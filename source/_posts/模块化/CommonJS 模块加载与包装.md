---
title: Commonjs 模块加载与包装
date: 2025-11-01
category: 前端
tags: [前端, 模块化, CommonJS]
---

## Node.js 模块的本质

当 Node.js 加载一个模块文件时（例如 `math.js`），**并不是直接执行文件代码**，
而是会**先用一个函数包装起来**，再执行。

举个例子：

```js
// math.js
console.log('this is math module');
exports.add = (a, b) => a + b;
```

在 Node 内部执行时，会被包裹成：

```js
(function (exports, require, module, __filename, __dirname) {
  console.log('this is math module');
  exports.add = (a, b) => a + b;
});
```

然后 Node 执行时会大致做：

```js
const exports = {};
const module = { exports };
const filename = '/path/to/math.js';
const dirname = '/path/to';
wrapper(exports, require, module, filename, dirname);
return module.exports;
```

## 这样包装的目的

| 功能                      | 说明                                                      |
| ------------------------- | --------------------------------------------------------- |
| ✅ 提供模块作用域隔离     | 模块内定义的变量不会污染全局作用域                        |
| ✅ 提供模块环境变量       | `require`、`exports`、`module`、`__filename`、`__dirname` |
| ✅ 模拟类浏览器的沙盒环境 | 模块互不干扰，天然封装                                    |
| ✅ 支持缓存与依赖跟踪     | 便于实现模块单例与循环引用                                |

## 模块内五个隐式变量

当 Node 执行一个模块时，它为每个模块注入以下五个变量：

| 变量         | 含义                                            | 示例                        |
| ------------ | ----------------------------------------------- | --------------------------- |
| `exports`    | 导出对象的引用                                  | `{}`（初始为空）            |
| `require`    | 导入函数                                        | 可用于加载其他模块          |
| `module`     | 当前模块对象（包含 `exports`、`id`、`path` 等） | `{ exports: {} }`           |
| `__filename` | 当前模块的绝对路径                              | `/user/project/src/math.js` |
| `__dirname`  | 当前模块所在目录的绝对路径                      | `/user/project/src`         |

### 示例

```js
// demo.js
console.log(__dirname); // /Users/wujiu/project
console.log(__filename); // /Users/wujiu/project/demo.js
```

## 模块对象（`module`）的结构

每个模块加载后都会生成一个 `Module` 实例：

```js
{
  id: '/path/to/file.js',      // 模块标识符（通常是绝对路径）
  path: '/path/to',            // 模块所在目录
  exports: {},                 // 导出的对象
  filename: '/path/to/file.js',
  loaded: false,               // 是否已加载完成
  parent: [Object],            // 调用该模块的父模块
  children: [],                // 该模块依赖的子模块
}
```

加载完执行后 `loaded` 会变为 `true`。

## 作用域隔离的实际意义

假设有两个文件：

```js
// a.js
const count = 1;

// b.js
console.log(count);
```

执行 `b.js` 时会报错：`ReferenceError: count is not defined`
因为每个模块的变量都在自己封闭的函数作用域内，彼此完全独立。

这就避免了浏览器早期全局命名冲突问题（比如不同库都定义了 `utils`）。

## 补充：顶层 this 的行为

由于模块被包裹在函数中，**顶层 this 不再指向 global**：

```js
console.log(this === global); // false
console.log(this === module.exports); // true
```

也就是说：

> 在 CommonJS 模块中，顶层 `this` 实际上就是 `exports` 对象。

## 包装机制与性能

- 包装函数只在**首次加载模块时**生成；
- 后续加载直接从 `require.cache` 取；
- 这就是为什么模块是单例的。

## 总结

| 项目      | 内容                                                                  |
| --------- | --------------------------------------------------------------------- |
| 包装形式  | `(function (exports, require, module, __filename, __dirname){ ... })` |
| 作用      | 提供模块作用域与模块变量                                              |
| 隔离性    | 各模块变量互不干扰                                                    |
| 顶层 this | 指向 `module.exports`                                                 |
| 加载机制  | 首次编译 → 包装 → 缓存                                                |
