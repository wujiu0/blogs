---
title: tomcat
date: 2022-03-06 00:07:13
tags: [web]
---

## 安装中可能出现的问题

1. **黑窗口一闪而过**：

   检查 JAVA_HOME 环境变量是否配置正确

2. **启动报错**：

   可能端口被占用（默认为8080端口）

   + 找到占用端口的进程，kill it

   + 修改自身的端口号：在安装目录下的conf/server.xml中

     `<Connector port="8888" protocol="HTTP/1.1" connectionTimeout="20000" redirectPort="8445" />`

     一般会将tomcat的默认端口修改为80，80是http协议的默认端口号，

     ​		好处：在访问时，就不需要输入端口号了

## 配置

### 部署项目的方式

1. 直接将项目放到`webapps`目录下即可。

   + /*** : 项目的访问目录-->虚拟目录

   + 简化部署：将项目打包成一个war包，再将war包放置到`webapps`目录下

     war包会自动解压缩

2. 配置conf/server.xml文件

   在`<Host>`标签体中配置`<Context docBase="D:\hello" path="/hello">`

   + docbase : 项目存放的路径
   + path : 虚拟目录

3. 在`conf/Catalina/localhost`中创建任意的xml文件，写入以下内容

   <Context docBase="D:\hello">

   + 虚拟目录 : xml文件的名称
