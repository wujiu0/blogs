---
title: 关于js立即执行函数为什么必须加分号
typora-root-url: 关于js立即执行函数为什么必须加分号
date: 2023-03-01 19:16:46
tags: [JavaScript]
---

·

```js
var a = 10(function () {
  console.log(2);
})();
```

这段代码的执行结果并不是想象中的输出 2

而是会报如下一个错误：`Error:10 is not a function`

分析：查阅 ECMAScript 的语言规范，ECMAScript 的自动分号插入规则

在如上代码内并不会自动插入分号，而是会被这样解析：`var a = 10( function(){ console.log(2) } )()`

这样就很容易理解了

所以在立即执行函数之前一定要带上分号
