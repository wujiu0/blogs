---
title: >-
  Receiver class com.mchange.v2.c3p0.impl.NewProxyResultSet does not define or
  inherit an implementation of the resolved method 'abstract boolean isClosed()'
  of interface java.sql.ResultSet.] with root cause
date: 2022-04-11 18:08:16
tags: [异常处理]
---

检查一下 pom.xml 中的 c3p0 依赖是否存在或者版本是否太低

注意高版本的不再是

```xml
<dependency>
    <groupId>c3p0</groupId>
    <artifactId>c3p0</artifactId>
    <version>0.9.1.2</version>
</dependency>
```

而是（**注意 groupId 的变化**）：

```xml
<dependency>
    <groupId>com.mchange</groupId>
    <artifactId>c3p0</artifactId>
    <version>0.9.5.5</version>
</dependency>
```
