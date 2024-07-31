---
title: maven中pluginManagement
date: 2022-03-18 17:49:17
tags:
---

pluginManagement是表示插件声明，Maven不会加载其中的插件

一般是用来在父POM中定义，提供给子POM使用，子模块中直接应用groupId和artifactId，而不用指定版本，同时也方便统一管理；
