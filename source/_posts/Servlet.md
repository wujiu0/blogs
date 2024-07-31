---
title: Servlet
date: 2022-03-06 23:35:56
tags: [后端]
---

## 概念（Server applet）

运行在 Web 服务器或应用服务器上的程序,它是作为来自 Web 浏览器或其他 HTTP 客户端的请求和 HTTP 服务器上的数据库或应用程序之间的中间层

- Servlet 就是一个接口，定义了 Java 类被浏览器访问到（tomcat 识别）的规则。

- 定义一个类，实现 Servlet 接口，重写方法

## 执行原理

1. 当服务器接收到客户端浏览器的请求后，会解析请求 URL 路径，获取访问的 Servlet 的资源路径
2. 查找 web.xml 文件，是否有对应的<url-pattern>标签体内容
3. 如果有，则在找到对应的<servlet-class>全类名
4. tomcat 会将字节码文件加载进内存，并且创建其对象
5. 调用其方法

## 生命周期

1. 被创建：执行 init()方法，只执行一次

   - Servlet 什么时候被创建？

     默认情况下，第一次访问时，Servlet 被创建

     可以配置执行 Servlet 的创建时机

     ```xml
     <servlet>
        <!--负数表示在第一次访问时创建，非负数表示在服务器启动时创建 -->
     <load-on-startup>-1</load-on-startup>
     </servlet>
     ```

   - Servlet 的 init 方法，只执行一次，说明一个 Servlet 在内存中只存在一个对象，是单例的

     **多个用户同时访问时，可能存在线程安全问题**

     解决：尽量不要在 Servlet 中定义成员变量，即使定义了成员变量，也不要修改其值

2. 提供服务：执行 service()方法，执行多次

   每次访问 Servlet 时，service 方法都会被调用一次

3. 被销毁：执行 destroy 方法，只执行一次

   Servlet 被销毁时执行，服务器关闭时，Servlet 被销毁

   只有服务器正常关闭才会执行 destroy 方法

   > destroy 方法在 Servlet 被销毁之前执行，一般用于释放资源

## Servlet3.0：

- 好处：

  支持注解配置，可以不需要 web.xml 了

- 步骤：

  1. 创建 JavaEE 项目，选择 Servlet3.0 以上版本，可以不创建 web.xml
  2. 定义一个类，实现 Servlet 接口
  3. 重写方法
  4. 在类上使用@WebServlet 注解，进行配置@WebServlet("资源路径")
     - 一个 Servlet 可以定义多个访问路径：@WebServlet({"/d4","/dd4","/ddd4"})
     - 路径定义规则： 1. /xxx：路径匹配 2. /xxx/xxx:多层路径，目录结构 3. \*.do：扩展名匹配

## 体系结构

Servlet -- 接口
|
GenericServlet -- 抽象类
|
HttpServlet -- 抽象类

- GenericServlet：将 Servlet 接口中除了 service()以外的方法做了默认空实现

  将来定义 Servlet 类时，可以继承 GenericServlet，实现 service()方法即可

- HttpServlet：对 http 协议的一种封装，简化操作

  1. 定义类继承 HttpServlet
  2. 重写 doGet/doPost 方法
