---
title: burp爆破模块
date: 2021-04-10 15:14:16
tags: 工具使用
---

**Sniper**
这个是我们最常用的，Sniper 是狙击手的意思。这个模式会使用单一的 payload【就是导入字典的 payload】组。它会针对每个 position 中$$位置设置 payload。这种攻击类型适合对常见漏洞中的请求参数单独地进行测试。攻击中的请求总数应该是 position 数量和 payload 数量的乘积。

假设设置了两个 payload 位置,payload 组为"a,b",则会形成以下组合

| NO. | 位置 1 | 位置 2 |
| --- | ------ | ------ |
| 1   | a      |        |
| 2   | b      |        |
| 3   |        | a      |
| 4   |        | b      |

**Battering ram**
这一模式是使用单一的 payload 组。它会重复 payload 并且一次把所有相同的 payload 放入指定的位置中。这种攻击适合那种需要在请求中把相同的输入放到多个位置的情况。请求的总数是 payload 组中 payload 的总数。简单说就是一个 playload 字典同时应用到多个 position 中

| NO. | 位置 1 | 位置 2 |
| --- | ------ | ------ |
| 1   | a      | a      |
| 2   | b      | b      |

**Pitchfork**
这一模式是使用多个 payload 组。对于定义的位置可以使用不同的 payload 组。攻击会同步迭代所有的 payload 组，把 payload 放入每个定义的位置中。比如：position 中 A 处有 a 字典，B 处有 b 字典，则 a【1】将会对应 b【1】进行 attack 处理，这种攻击类型非常适合那种不同位置中需要插入不同但相关的输入的情况。请求的数量应该是最小的 payload 组中的 payload 数量

假设设置了两个 payload 位置,payload1 为"a,b",payload2 为"c,d"则会形成以下组合

| NO. | 位置 1 | 位置 2 |
| --- | ------ | ------ |
| 1   | a      | c      |
| 2   | b      | d      |

**Cluster bomb**
这种模式会使用多个 payload 组。每个定义的位置中有不同的 payload 组。攻击会迭代每个 payload 组，每种 payload 组合都会被测试一遍。比如：position 中 A 处有 a 字典，B 处有 b 字典，则两个字典将会循环搭配组合进行 attack 处理这种攻击适用于那种位置中需要不同且不相关或者未知的输入的攻击。攻击请求的总数是各 payload 组中 payload 数量的乘积。

| NO. | 位置 1 | 位置 2 |
| --- | ------ | ------ |
| 1   | a      | c      |
| 2   | a      | d      |
| 3   | b      | c      |
| 4   | b      | d      |
