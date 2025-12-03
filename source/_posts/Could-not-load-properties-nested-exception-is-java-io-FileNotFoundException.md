---
title: Could not load properties; nested exception is java.io.FileNotFoundException
date: 2022-03-18 20:18:12
tags:
---

Maven 项目，applicationContext.xml、jdbc.properties 文件均放置在 src/main/resources 目录下，Tomcat 部署项目，src/main/resources 目录下的配置文件默认位置为：{项目名}/WEB-INF/classes，而 Spring 却在项目根目录下寻找，肯定找不到，因此，配置时指定 classpath 目录下寻找即可。

解决方案如下：

`<context:property-placeholder location="**classpath:db.properties**" />`
