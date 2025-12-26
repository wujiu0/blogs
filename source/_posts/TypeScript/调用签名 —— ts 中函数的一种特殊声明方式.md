---
title: 调用签名 —— ts 中函数的一种特殊声明方式
date: 2025-10-24
tags: [TypeScript]
---

> 摘自 [ts 官方文档](https://www.typescriptlang.org/docs/handbook/2/functions.html#call-signatures)

### Call Signatures

在 JavaScript 中，函数除了可调用之外还可以具有属性。但是，函数类型表达式语法不允许声明属性。如果我们想用属性描述可调用的东西，我们可以在对象类型中编写一个`call signature`：

```ts
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};

function doSomething(fn: DescribableFunction) {
  console.log(fn.description + ' returned ' + fn(6));
}

function myFunc(someArg: number) {
  return someArg > 3;
}

myFunc.description = 'default description';

doSomething(myFunc);
```
