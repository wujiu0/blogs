---
title: lombok继承父类时的问题
date: 2022-08-09 10:09:30
tags:
---

### 问题描述

使用Lombok时，在继承关系中，子类使用@Data注解，产生的ToString()方法不包含父类的属性。

### 原因

`lombok.Data`是默认使用`lombok.EqualsAndHashCode` 和 `lombok.ToString`。而这两种注解有一个参数`callSuper` 默认是false，即默认不适用父类。

### 解决

添加`@ToString(callSuper = true)`
