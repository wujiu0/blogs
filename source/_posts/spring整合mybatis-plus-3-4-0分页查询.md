---
title: spring使用mybatis-plus 3.4.0+ 的分页查询
date: 2022-06-01 00:24:50
tags:
---

在 Mybatis-plus3.4.0 之前，使用 paginationInterceptor 来进行拦截

自 3.4.0 版本后，都是使用`MybatisPlusInterceptor` 内注入`PaginationInnerInterceptor`来进行的拦截

## 导入依赖

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus</artifactId>
    <version>3.5.1</version>
</dependency>
```

## 相关配置

> 注意：此处一定要把分页插件配入 SQLSessionFactory 内部的 plugins

```xml
<!--配置MyBatis的SqlSessionFactory-->
<bean id="sqlSessionFactory" class="com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource"/>
    <property name="plugins">
        <array>
            <bean class="com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor">
                <property name="interceptors">
                    <list>
                        <bean class="com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor"/>
                    </list>
                </property>
            </bean>
        </array>
    </property>
</bean>
```

## 测试类

```java
@Test
public void testSelectPage() {
    Page<User> page = new Page<>(1, 3);
    QueryWrapper<User> wrapper = new QueryWrapper<>();
    wrapper.eq("password", "123456");

    userMapper.selectPage(page, wrapper);
    // 获取页数
    System.out.println(page.getPages());
    // 获取总数据条数
    System.out.println(page.getTotal());
    // 获取当前页
    System.out.println(page.getCurrent());
    // 遍历结果
    page.getRecords().forEach(System.out::println);
}
```
