---
title: burp爆破模块
date: 2021-04-10 15:14:16
tags: 工具使用
---



**Sniper**  
这个是我们最常用的，Sniper是狙击手的意思。这个模式会使用单一的payload【就是导入字典的payload】组。它会针对每个position中$$位置设置payload。这种攻击类型适合对常见漏洞中的请求参数单独地进行测试。攻击中的请求总数应该是position数量和payload数量的乘积。

假设设置了两个payload位置,payload组为"a,b",则会形成以下组合

| NO.  | 位置1 | 位置2 |
| ---- | ----- | ----- |
| 1    | a     |       |
| 2    | b     |       |
| 3    |       | a     |
| 4    |       | b     |

**Battering ram**   
这一模式是使用单一的payload组。它会重复payload并且一次把所有相同的payload放入指定的位置中。这种攻击适合那种需要在请求中把相同的输入放到多个位置的情况。请求的总数是payload组中payload的总数。简单说就是一个playload字典同时应用到多个position中

| NO.  | 位置1 | 位置2 |
| ---- | ----- | ----- |
| 1    | a     | a     |
| 2    | b     | b     |



**Pitchfork**   
这一模式是使用多个payload组。对于定义的位置可以使用不同的payload组。攻击会同步迭代所有的payload组，把payload放入每个定义的位置中。比如：position中A处有a字典，B处有b字典，则a【1】将会对应b【1】进行attack处理，这种攻击类型非常适合那种不同位置中需要插入不同但相关的输入的情况。请求的数量应该是最小的payload组中的payload数量

假设设置了两个payload位置,payload1为"a,b",payload2为"c,d"则会形成以下组合

| NO.  | 位置1 | 位置2 |
| ---- | ----- | ----- |
| 1    | a     | c     |
| 2    | b     | d     |



**Cluster bomb**   
这种模式会使用多个payload组。每个定义的位置中有不同的payload组。攻击会迭代每个payload组，每种payload组合都会被测试一遍。比如：position中A处有a字典，B处有b字典，则两个字典将会循环搭配组合进行attack处理这种攻击适用于那种位置中需要不同且不相关或者未知的输入的攻击。攻击请求的总数是各payload组中payload数量的乘积。



| NO.  | 位置1 | 位置2 |
| ---- | ----- | ----- |
| 1    | a     | c     |
| 2    | a     | d     |
| 3    | b     | c     |
| 4    | b     | d     |

