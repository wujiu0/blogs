---
title: Spring配置数据源
date: 2022-03-20 14:19:08
tags: [框架, spring]
---

可以将 DataSource 的创建权交由 Spring 容器去完成

- DataSource 有无参构造方法，而 Spring 默认就是通过无参构造方法实例化对象的
- DataSource 要想使用需要通过 set 方法设置数据库连接信息，而 Spring 可以通过 set 方法进行字符串注入

```xml
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    <property name="driverClass" value="com.mysql.jdbc.Driver"/>
    <property name="jdbcUrl" value="jdbc:mysql://localhost:3306/test"/>
    <property name="user" value="root"/>
    <property name="password" value="root"/>
</bean>
```

抽取 jdbc 配置文件

首先，需要引入 context 命名空间和约束路径：

- 命名空间：`xmlns:context="http://www.springframework.org/schema/context"`
- 约束路径：`http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd`

```xml
<context:property-placeholder location="classpath:jdbc.properties"/>
<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    <property name="driverClass" value="${jdbc.driver}"/>
    <property name="jdbcUrl" value="${jdbc.url}"/>
    <property name="user" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
</bean>
```
