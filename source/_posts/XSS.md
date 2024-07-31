---
title: XSS
date: 2021-01-16 19:30:21
tags: [web安全, XSS]
---

## XSS

跨站脚本攻击,  
网页内嵌入 HTML,CSS,js 代码

## 分类

- 反射型--前端->后端->前端
- 存储型--前端->后端->数据库->前端
- DOM 型--前端

构造如下 payload

```jsp
<script>alert(1)</script>
```

```js
onclick = alert();
```

```
<a href="javascript:alert()">
```

**str_replace()** 字符串替换,区分大小写

```
可以通过大小写,
若替换为空,且只替换一次,可尝试双写绕过
&#ASCII  实体化编码绕过
```

**strtolower()** 把所有字母转换为小写
