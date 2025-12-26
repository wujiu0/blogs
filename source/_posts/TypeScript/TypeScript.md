---
title: TypeScript
date: 2025-10-24
tags: [TypeScript]
---

## 类型总览

- js 的基本类型`string` `number` `boolean` `undefined` `null` `object` `symbol` `bigint`

  > 在 JavaScript 中的这些内置构造函数： `Number` 、 `String` 、 `Boolean` ，⽤于创建对应的包装对象， 在⽇常开发时很少使⽤，在 TypeScript 中也是同理，所以在 TypeScript 中进⾏类型声明时，通常都是⽤⼩写的 `number` 、 `string` 、 `boolean`

  ```ts
  let str1: string = new String('hello'); // 报错
  let str2: String = 'hello'; // 可正常使用
  ```

  > 原始类型 VS 包装对象<br> > **原始类型**：如 `number` 、 `string` 、 `boolean` ，在 JavaScript 中是简单数据类型，它们在内存中占⽤空间少，处理速度快。<br> > **包装对象**：如 Number 对象、 String 对象、 Boolean 对象，是复杂类型，在内存中占⽤更多空间，在⽇常开发时很少由开发⼈员⾃⼰创建包装对象。 <br> > **⾃动装箱**：JavaScript 在必要时会⾃动将原始类型包装成对象，以便调⽤⽅法或访问属性

- `any` **任意类型**，⼀旦将变量类型限制为 `any` ，那就意味着放弃了对该变量的类型检查
  可以赋值给任意类型的变量
- `unknown` **未知类型**，适⽤于：起初不确定数据的具体类型，要后期才能确定

  - `unknown` 可以理解为⼀个类型安全的 any 。
  - 会强制开发者在使⽤之前进⾏类型检查，从⽽提供更强的类型安全性。
  - 读取 `any` 类型数据的任何属性都不会报错，⽽ `unknown` 正好与之相反

  ```ts
  // 设置a的类型为unknown
  let a: unknown;
  a = 'hello';
  //第⼀种⽅式：加类型判断
  if (typeof a === 'string') {
    x = a;
    console.log(x);
  }

  //第⼆种⽅式：加断⾔
  x = a as string;
  x = <string>a;
  ```

- `never` 任何类型都不是, 一般由 ts 主动推断出来
- `void` 空类型, 通常用于函数返回值声明， 表示无返回值, 可以接受 `undefined`

  ```ts
  function logMessage(msg: string): void {
    console.log(msg);
  }

  let result = logMessage('你好');

  if (result) {
    // 此⾏报错：⽆法测试 "void" 类型的表达式的真实性
    console.log('logMessage有返回值');
  }
  ```

- `tuple`
- `enum`
- 联合类型
- 交叉类型

## 工具类型

- `Partial<T>` 将 `T`所有属性变为可选
- `Required<T>`将 `T`所有属性变为必需
- `Readonly<T>`
- `Record<K, T>` 从键集合 `K` 映射到值类型 `T`。`K` 通常是字符串字面量联合或 `keyof`。
- `Pick<T, K extends keyof T>`
- `Omit<T, K extends keyof any>`
- `Exclude<T, U>`从联合 `T` 中移除可分配给 `U` 的成员。
- `Extract<T, U>`从 `T` 中提取可分配给 `U` 的成员（`Exclude` 的逆）
- `NonNullable<T>`从 `T` 中移除 `null` 与 `undefined`
- `ReturnType<T>`提取函数返回类型。
