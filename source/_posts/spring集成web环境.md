---
title: spring集成web环境
date: 2022-03-27 23:43:56
tags: [框架, spring]
---

应用上下文对象是通过`new ClasspathXmlApplicationContext`(spring 配置文件) 方式获取的，但是每次从容器中获得 Bean 时都要编写 new ClasspathXmlApplicationContext(spring 配置文件) ，这样的弊端是配置文件加载多次，应用上下文对象创建多次。

在 Web 项目中，可以使用`ServletContextListener`监听 Web 应用的启动，我们可以在 Web 应用启动时，就加载 Spring 的配置文件，创建应用上下文对象`ApplicationContext`，在将其存储到最大的域`servletContext`域中，这样就可以在任意位置从域中获得应用上下文`ApplicationContext`对象了。

Spring 提供了一个监听器`ContextLoaderListener`就是对上述功能的封装，该监听器内部加载 Spring 配置文件，创建应用上下文对象，并存储到`ServletContext`域中，提供了一个客户端工具`WebApplicationContextUtils`供使用者获得应用上下文对象。

## 步骤

1. 导入 Spring 集成 web 的坐标

   ```xml
   <dependency>
       <groupId>org.springframework</groupId>
       <artifactId>spring-web</artifactId>
       <version>5.0.5.RELEASE</version>
   </dependency>
   ```

2. 在 web.xml 中配置`ContextLoaderListener`监听器

   ```xml
   <!--全局参数-->
   <context-param>
       <param-name>contextConfigLocation</param-name>
       <param-value>classpath:applicationContext.xml</param-value>
   </context-param>
   <!--Spring的监听器-->
   <listener>
       <listener-class>
       org.springframework.web.context.ContextLoaderListener
       </listener-class>
   </listener>
   ```

3. 通过工具获取应用上下文对象

   ```java
   ApplicationContext applicationContext = WebApplicationContextUtils.getWebApplicationContext(servletContext);
   Object obj = applicationContext.getBean("id");
   ```
