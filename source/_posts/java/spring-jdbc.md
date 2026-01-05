---
title: spring-jdbc
date: 2022-03-27 23:30:58
tags: [框架, spring]
---

## 概述

它是 spring 框架中提供的一个对象，是对原始繁琐的 Jdbc API 对象的简单封装。spring 框架为我们提供了很多的操作模板类。例如：操作关系型数据的 JdbcTemplate 和 HibernateTemplate，操作 nosql 数据库的 RedisTemplate，操作消息队列的 JmsTemplate 等等。

## 开发步骤

1. 导入`spring-jdbc`和`spring-tx`坐标

   ```xml
   <dependency>
       <groupId>org.springframework</groupId>
       <artifactId>spring-jdbc</artifactId>
       <version>5.0.5.RELEASE</version>
   </dependency>

   <dependency>
       <groupId>org.springframework</groupId>
       <artifactId>spring-tx</artifactId>
       <version>5.0.5.RELEASE</version>
   </dependency>
   ```

2. 创建数据库表和实体

3. 创建 JdbcTemplate 对象

4. 执行数据库操作

   ```java
   //1、创建数据源对象
   ComboPooledDataSource dataSource = new ComboPooledDataSource();
   dataSource.setDriverClass("com.mysql.jdbc.Driver");
   dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/test");
   dataSource.setUser("root");
   dataSource.setPassword("root");
   //2、创建JdbcTemplate对象
   JdbcTemplate jdbcTemplate = new JdbcTemplate();
   //3、设置数据源给JdbcTemplate
   jdbcTemplate.setDataSource(dataSource);
   //4、执行操作
   jdbcTemplate.update("insert into account values(?,?)","tom",5000);
   ```

   我们可以将 JdbcTemplate 的创建权交给 Spring，将数据源 DataSource 的创建权也交给 Spring，在 Spring 容器内部将数据源 DataSource 注入到 JdbcTemplate 模版对象中，配置如下：

   ```xml
   <!--数据源DataSource-->
   <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
       <property name="driverClass" value="com.mysql.jdbc.Driver"></property>
       <property name="jdbcUrl" value="jdbc:mysql:///test"></property>
       <property name="user" value="root"></property>
       <property name="password" value="root"></property>
   </bean>
   <!--JdbcTemplate-->
   <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
       <property name="dataSource" ref="dataSource"></property>
   </bean>
   ```

   从容器中获得 JdbcTemplate 进行添加操作

   ```java
   @Test
   public void testSpringJdbcTemplate() throws PropertyVetoException {
       ApplicationContext applicationContext = new
       ClassPathXmlApplicationContext("applicationContext.xml");
       JdbcTemplate jdbcTemplate = applicationContext.getBean(JdbcTemplate.class);
       jdbcTemplate.update("insert into account values(?,?)","lucy",5000);
   }
   ```

## 常用方法

- update()：执行 DML 语句。增删改。

- queryForMap()：查询结果，将结果集封装为 Map 集合，将列名作为 key，值作为 value

  ```java
  public void test(){
      String sql = "select * from emp where id = ? or id = ?";
      Map<String, Object> map = template.queryForMap(sql, 1001,1002);
      System.out.println(map);
  }
  ```

  > 这个方法查询的结果集长度只能是 1

- queryForList()：查询结果，将结果集封装为一个 list 集合

  ```java
  public void test(){
      String sql = "select * from emp";
      List<Map<String, Object>> list = template.queryForList(sql);

      for (Map<String, Object> stringObjectMap : list) {
          System.out.println(stringObjectMap);
      }
  }
  ```

  > 将每一条记录封装为一个 Map 集合，再将 Map 集合装载到 List 集合中

- query()：查询结果，将结果集封装为 JavaBean 对象

  参数：`RowMapper`

  - 一般我们使用`BeanPropertyRowMapper`实现类，可以完成数据到 JavaBean 的自动封装

  ```java
  public void test(){
      String sql = "select * from emp";
      List<Emp> list = template.query(sql, new BeanPropertyRowMapper<Emp>(Emp.class));
      for (Emp emp : list) {
          System.out.println(emp);
      }
  }
  ```

  - queryForObject()：查询结果，将结果封装为对象

  ```java
  public void test(){
      String sql = "select count(id) from emp";
      Long total = template.queryForObject(sql, Long.class);
      System.out.println(total);
  }
  ```

  > 一般用于聚合函数的查询
