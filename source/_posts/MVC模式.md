---
title: MVC模式
date: 2022-03-12 22:40:49
tags: 
---

## 

MVC是一种分层开发的模式：

+ M：Model，业务模型，处理业务
+ V：view，视图，界面展示
+ C：Controller，控制器，处理请求，调用模型和视图

## 三层架构

+ 表现层  com.example.web/controller

  接收请求，封装数据，调用业务逻辑层，响应数据

  + Controller控制器--->view视图

+ 业务逻辑层  com.example.service

  对业余逻辑进行封装，组合数据访问层中基本功能，形成复杂的业务逻辑功能

  + 注册--->selectByName&&insert

+ 数据访问层（持久层） com.example.dao/mapper

  对数据库的CRUD基本操作

  + selectAll
  + selectByName
  + insert
  + update
  + delete

浏览器<---->表现层<-->业务逻辑层<-->数据访问层<-->DB



