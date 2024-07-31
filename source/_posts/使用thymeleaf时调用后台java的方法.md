---
title: 使用thymeleaf时调用后台java的方法
typora-root-url: 使用thymeleaf时调用后台java的方法
date: 2022-10-19 20:23:22
tags: 
---





1. 首先需要将需要调用方法的对象交由spring容器管理

   这样

   ![image-20221019202537221](./image-20221019202537221.png)

   或者这样

   ![image-20221019202619953](./image-20221019202619953.png)

2. 接下来在需要调用该方法的地方，使用`@xxx.method()`即可

   ![image-20221019202721596](./image-20221019202721596.png)
