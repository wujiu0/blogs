---
title: mysql中的isnull函数
date: 2021-10-30 15:59:58
tags: [数据库]
---

1.`isnull(exper)` 判断exper是否为空，是则返回1，否则返回0

2.`ifnull(exper1,exper2)`判断exper1是否为空，是则用exper2代替

3.`nullif(exper1,exper2)`如果expr1= expr2 成立，那么返回值为NULL，否则返回值为  expr1。

