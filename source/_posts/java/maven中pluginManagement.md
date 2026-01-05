---
title: maven中pluginManagement
date: 2022-03-18 17:49:17
tags:
---

pluginManagement 是表示插件声明，Maven 不会加载其中的插件

一般是用来在父 POM 中定义，提供给子 POM 使用，子模块中直接应用 groupId 和 artifactId，而不用指定版本，同时也方便统一管理；
