---
title: mysql大小写敏感的问题
typora-root-url: mysql大小写敏感的问题
date: 2022-10-15 11:18:53
tags:
---

# 一、MySQL 是大小写敏感的吗

MySQL 在 Windows 下不区分大小写，但在 Linux 下默认是区分大小写。如果你稍加不注意就会出现在本机开发的程序运行一切正常，发布到服务器行就出现表名找不到的问题，一头雾水。

由于这个原因，在阿里巴巴规约中这样要求：

> 【强制】表名、字段名必须使用小写字母或数字 ， 禁止出现数字开头，禁止两个下划线中间只 出现数字。数据库字段名的修改代价很大，因为无法进行预发布，所以字段名称需要慎重考虑。

因此，数据库名、 表名、字段名，都不允许出现任何大写字母，避免引起不必要的麻烦。

# 二、MySQL 的大小写敏感是由参数控制的

mysql 大小写敏感配置相关的两个参数，lower_case_file_system 和 lower_case_table_names。

查看当前 mysql 的大小写敏感配置，可以使用如下语句

```mysql
show global variables like '%lower_case%';

+------------------------+-------+
| Variable_name          | Value |
+------------------------+-------+
| lower_case_file_system | ON    |
| lower_case_table_names | 0     |
+------------------------+-------+
```

参数说明如下：

1. lower_case_file_system，代表当前系统文件是否大小写敏感，只读参数，无法修改。ON 大小写不敏感，OFF 大小写敏感。
   - 此变量描述数据所在的操作系统的文件目录是否区分大小写。 OFF 表示文件名区分大小写，ON 表示它们不区分大小写。此变量是只读的，因为它反映了文件系统的属性，设置它对文件系统没有影响。
2. lower_case_table_names，代表表名是否大小写敏感，可以修改，参数有 0、1、2 三种。
   - 0 大小写敏感。（Unix，Linux 默认） 创建的库表将原样保存在磁盘上。如 create database TeSt;将会创建一个 TeSt 的目录，create table AbCCC …将会原样生成 AbCCC.frm 文件，SQL 语句也会原样解析。
   - 1 大小写不敏感。（Windows 默认） 创建的库表时，MySQL 将所有的库表名转换成小写存储在磁盘上。 SQL 语句同样会将库表名转换成小写。 如需要查询以前创建的 Testtable（生成 Testtable.frm 文件），即便执行 select _ from Testtable，也会被转换成 select _ from testtable，致使报错表不存在。
   - 2 大小写不敏感（OS X 默认） 创建的库表将原样保存在磁盘上， 但 SQL 语句将库表名转换成小写。

# 三、MySQL 大小写敏感如何设置

在 Linux 系统中修改 my.cnf 文件，在 Windows 下修改 my.ini 文件，新增或修改以下内容。

```undefined
lower_case_table_names = 0 或 lower_case_table_names = 1
```

然后重启 MySQL 服务才可以生效。

# 四、开发注意事项

1. 如果要将 lower_case_table_names 从 0（敏感）修改为 1（不敏感）时，必须先对旧数据表的表名进行处理，把所有数据库的表名先改为小写，最后再设置 lower_case_table_names 为 1，否则依然会出现无法找到表名的问题。
2. 在 Windows 上 lower_case_table_names 默认值为 1（不敏感），在 macOS 上默认值为 2（不敏感）。在 Linux 上不支持值 2，服务器强制该值为 0（敏感）。
3. 并且 MySQL 官方也提示说：如果在数据目录驻留在不区分大小写的文件系统（例如 Windows 或 macOS）上，则不应将 lower_case_table_names 设置为 0。
4. 否则将出现 MySQL 服务无法启动的问题。

# 五、总结

由于操作系统不同导致大小写敏感的默认设置不一致，我们在开发时一定要注意，应该养成严格的意识，SQL 语句一律采用小写字母，避免无意义的踩坑。

MySQL 是日常工作中使用最对的数据库之一，所以必须要要较为深入和全面的掌握，对于高阶人员还要掌握分布式事务、各种数据库锁、传播机制等。

> 作者：尹洪亮
> 链接：https://www.jianshu.com/p/f2eabcef6577
> 来源：简书
