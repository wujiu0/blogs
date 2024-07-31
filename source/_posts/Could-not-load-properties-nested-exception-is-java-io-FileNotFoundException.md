---
title: Could not load properties; nested exception is java.io.FileNotFoundException
date: 2022-03-18 20:18:12
tags:
---

Maven项目，applicationContext.xml、jdbc.properties文件均放置在src/main/resources目录下，Tomcat部署项目，src/main/resources目录下的配置文件默认位置为：{项目名}/WEB-INF/classes，而Spring却在项目根目录下寻找，肯定找不到，因此，配置时指定classpath目录下寻找即可。

解决方案如下：

　`<context:property-placeholder location="**classpath:db.properties**" />`



