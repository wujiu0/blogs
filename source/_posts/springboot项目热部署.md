---
title: springboot项目热部署
date: 2022-08-08 17:54:24
tags:
---

这里使用 springboot-devtools

1. 导入坐标

   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-devtools</artifactId>
   </dependency>
   ```

   此时热部署已经生效，但是还需要手动点击`Build project`或者按快捷键`Ctrl+F9`来让 idea 重新构建项目(编译修改后的类)

   ### 开启自动构建：

2. 在 idea 中开启`Settings -> Complier -> Build project automatically`

   > idea 版本：2022.2

3. 开启`Settings -> Advanced Settings -> Allow auto-make to start even if developed application is currently running`
