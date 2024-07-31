---
title: BeanUtils工具类
date: 2022-03-09 23:49:22
tags: [java工具类]
---

导入 maven 坐标

```xml
<dependency>
    <groupId>commons-beanutils</groupId>
    <artifactId>commons-beanutils</artifactId>
    <version>1.9.4</version>
</dependency>
```

用于简化数据封装（JavaBean）

方法：

- setProperty(Object bean,String name, Object value)
- getProperty(Object bean, String name)
- pupulate(Object obj, Map map)：将 map 集合的键值对信息封装到对应的 JavaBean 对象中

JavaBean：

1. 类必须被 public 修饰
2. 必须提供空参构造器
3. 成员变量必须使用 private 修饰
4. 提供公共 getter 和 setter 方法

属性：setter 和 getter 方法截取后的产物，不完全等于成员变量

​ 例如：getUsername() ->Username->username
