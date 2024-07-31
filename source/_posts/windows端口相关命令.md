---
title: windows端口相关命令
date: 2022-10-02 18:51:02
tags:
---

+ 查询端口

  `netstat -ano`

+ 查询指定端口

  `netstat -ano |findstr ”端口号"`

+  根据进程PID查询进程名称

  `tasklist |findstr "进程PID号"`

+ 根据PID杀死任务

  `taskkill /F/PID "进程PID号"`

+ 根据进程名称杀死任务
  `taskkill -f -t -im "进程名称"`
