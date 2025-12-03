---
title: jwt
typora-root-url: jwt
date: 2023-06-09 09:57:50
tags: [安全, JWT, web, 前端]
---

## jwt

jwt 就是 Json Web Token

由三个部分组成，格式为 header.payload.signature

![image-20230609103614667](./image-20230609103614667.png)

jwt 并没有加密，只是对用户信息进行了一个签名，用来在服务器验证提交的信息是否被篡改过

![image-20230609104115307](./image-20230609104115307.png)
