---
title: PowerShell 及 wsl中使用主机代理的方式
date: 2022-09-09 15:20:30
tags:
---

软件：clash for windows

1. 首先在clash中开启 `Allow LAN`选项

   ![](./1.png)

2. pwsh中使用 `$env:HTTP_PROXY="http://127.0.0.1:7890"`设置环境变量

   ![](./2.png)

3. wsl中使用 `export http_proxy="{网关ip}:7890"`

   ![](./4.png)

   > 网关ip可以在主机中查看wsl的虚拟网络适配器的ipv4地址
   >
   > ![](./3.png)

