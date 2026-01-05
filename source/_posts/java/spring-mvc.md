---
title: spring_mvc
date: 2022-03-26 00:11:23
tags: [框架, spring]
---

## 概述

SpringMVC 是一种基于 Java 的实现 MVC 设计模型的请求驱动类型的轻量级 Web 框架，属于
SpringFrameWork 的后续产品，已经融合在 Spring Web Flow 中。
SpringMVC 已经成为目前最主流的 MVC 框架之一，并且随着 Spring3.0 的发布，全面超越 Struts2，成为最优秀的 MVC 框架。它通过一套注解，让一个简单的 Java 类成为处理请求的控制器，而无须实现任何接口。同时它还支持 RESTful 编程风格的请求。

## 开发步骤

客户端发起请求，服务器接收请求，执行逻辑并进行视图跳转

1. 导入 spring-mvc 相关坐标

   ```xml
   <!--Spring坐标-->
   <dependency>
       <groupId>org.springframework</groupId>
       <artifactId>spring-context</artifactId>
       <version>5.0.5.RELEASE</version>
   </dependency>
   <!--SpringMVC坐标-->
   <dependency>
       <groupId>org.springframework</groupId>
       <artifactId>spring-webmvc</artifactId>
       <version>5.0.5.RELEASE</version>
   </dependency>
   <!--Servlet坐标-->
   <dependency>
       <groupId>javax.servlet</groupId>
       <artifactId>servlet-api</artifactId>
       <version>2.5</version>
   </dependency>
   <!--Jsp坐标-->
   <dependency>
       <groupId>javax.servlet.jsp</groupId>
       <artifactId>jsp-api</artifactId>
       <version>2.0</version>
   </dependency>
   ```

2. 配置 SpringMVC 核心控制器`DispathcerServlet`

   ```xml
   <servlet>
       <servlet-name>DispatcherServlet</servlet-name>
       <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
       <init-param>
           <param-name>contextConfigLocation</param-name>
           <param-value>classpath:spring-mvc.xml</param-value>
       </init-param>
       <load-on-startup>1</load-on-startup>
   </servlet>
   <servlet-mapping>
       <servlet-name>DispatcherServlet</servlet-name>
       <url-pattern>/</url-pattern>
   </servlet-mapping>
   ```

3. 创建 Controller 类和视图页面

   ```java
   public class QuickController {
       public String quickMethod(){
           System.out.println("quickMethod running.....");
           return "index";
       }
   }
   ```

4. 使用注解配置 Controller 类中业务方法的映射地址

   ```java
   @Controller
   public class QuickController {
       @RequestMapping("/quick")
       public String quickMethod(){
           System.out.println("quickMethod running.....");
           return "index";
       }
   }
   ```

5. 配置 SpringMVC 核心文件 `spring-mvc.xml`

   ```xml
   <beans xmlns="http://www.springframework.org/schema/beans"
   xmlns:mvc="http://www.springframework.org/schema/mvc"
   xmlns:context="http://www.springframework.org/schema/context"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
   					http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd
   					http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd">

   <!--配置注解扫描-->
   <context:component-scan base-package="com.example"/>

   </beans>
   ```

6. 客户端发起请求测试

   `http://localhost:8080/itheima_springmvc1/quick` ---->> 控制台打印`quickMethod running....`

## SpringMVC 的数据响应方式

- 页面跳转
- 回写数据

## SpringMVC 获得请求数据

### 获得请求参数

客户端请求参数的格式是：name=value&name=value... ...
服务器端要获得请求的参数，有时还需要进行数据的封装，SpringMVC 可以接收如下类型的参数：

- 基本类型参数
- POJO 类型参数
- 数组类型参数
- 集合类型参数

### 获得基本类型参数

Controller 中的业务方法的参数名称要与请求参数的 name 一致，参数值会自动映射匹配。

`http://localhost:8080/itheima_springmvc1/quick9?username=zhangsan&age=12`

```java
@RequestMapping("/quick9")
@ResponseBody
public void quickMethod9(String username,int age) throws IOException {
    System.out.println(username);
    System.out.println(age);
}
```
