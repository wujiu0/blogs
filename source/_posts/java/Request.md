---
title: Request&&Response
date: 2022-03-09 23:03:21
tags: [后端]
---

## 概述

1. request和response对象是由服务器创建的
2. request对象用来获取请求消息，response用来设置响应消息

## Request

### 继承体系

ServletRequest   -- 接口
		|
HttpServletRequest  -- 接口
		|
org.apache.catalina.connector.RequestFacade 类（tomcat）

### 功能

1. 获取请求消息数据

   1. 获取请求行数据

       GET  /day14/demo1?name=zhangsan  HTTP/1.1 
   

      + 获取请求方式：GET

        `String getMethod()`
        
      + 获取虚拟目录：/day14
   
        `String getContextPath()`
   
      + 获取Servlet路径：/demo1
   
        `String getServletPath()`
   
      + 获取get方式请求参数：name=zhangsan
   
        `String getQueryString()`
   
      + 获取请求URI：/day14/demo1
   
        `String getRequestURI()`
   
        URL：`http://localhost/day14/demo1`
   
        `StringBuffer getRequestURL()`
   
        > URL：统一资源定位符（中华人民共和国）
        >
        > URI：统一资源标识符（共和国）
   
      + 获取协议及版本：HTTP/1.1
   
        `String getProtocol()`
   
      + 获取客户机的IP地址：
   
        `String getRemoteAddr()`
   
   2. 获取请求头数据
   
      + 通过请求头名称获取请求头的值
   
        `String getHeader(String name)`
   
      + 获取所有请求头名称
   
        `Enumeration<String> getHeaderNames()`
   
   3. 获取请求体数据：
   
      > 只有POST请求方式才有请求体，在请求体中封装了POET请求的请求参数
   
      1. 获取流对象
   
         `BufferedReader getReader()`：获取字符输入流，只能操作字符数据
   
         `ServletInputStream getInputStream()`：获取字节输入流，可以操作所有类型数据
   
      2. 再从流中获取数据
   
2. 其他功能：

   1. 获取请求参数通用方式：不论get还是post请求方式都可以使用下列方法来获取请求参数

      + `String getParameter(String name)：`根据参数名称获取参数值
      + `String[] getParameterValues(String name)`：根据参数名称获取参数值的数组
      + `Enumeration<String> getParameterNames()`：获取所有请求参数名称
      + `Map<String, String[]> getParameterMap()`：获取所有参数的Map集合

      中文乱码问题：

      + get方式：先使用'iso-8859-1'字符集解析get参数，再转化成utf-8编码的java 的String对象
   
     `String name = new String(request.getParameter("name").getBytes("iso-8859-1"),"utf-8");`
   
     > tomcat8已经将get方式乱码问题解决了
        >
        > Tomcat8URI默认编码为“UTF-8”，而Tomcat7URI默认编码为“ISO-8859-1”
   
      + post方式：在获取参数前，设置request的编码`request.setCharacterEncoding("utf-8")`
   
   2. 请求转发：一种在服务器内部的资源跳转方式
   
   + 步骤：
        1. 通过request对象获取请求转发器对象：`RequestDispatcher getRequestDispatcher(String path)`
     2. 使用RequestDispatcher对象来进行转发：`forward(ServletRequest request, ServletResponse response)`
      + 特点：
     1. 浏览器地址栏路径不发生变化
        2. 只能转发到当前服务器内部资源中
     3. 转发是一次请求
   
3. 共享数据：
   
      域对象：一个有作用范围的对象，可以在范围内共享数据
   
   request域：代表一次请求的范围，一般用于请求转发的多个资源中共享数据
   
   方法：
   
      1. `void setAttribute(String name, Object obj)`：存储数据
      2. `Object getAttribute(String name)`：通过键获取值
      3. `void removeAttribute(String name)`：通过键移除键值对
   
   4. 获取ServletContext：
   
      `ServletContext getServletContext()`
