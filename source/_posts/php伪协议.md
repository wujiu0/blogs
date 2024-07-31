---
title: php伪协议
date: 2021-01-04
tags: web安全
---

## php 伪协议

_需要首先将 php.ini 中的 allwo_url_fopen 和 allow_url_include 设置为 On_

##### php:// 访问各个输入/输出流

- php://input 访问请求的原始数据的只读流
  可以获取到 POST 的数据

  ```php
  http://127.0.0.1/cmd.php?file=php://input

  [POST DATA] <?php phpinfo()?>
  ```

- php://output 只写的数据流
  允许以 print 和 echo 一样的方式写入到输出缓冲区

- php://filter 元封装器,设计用于数据流打开时的筛选过滤应用

  ```php
  php://filter/read=convert.base64-encode/resource=flag.php
  ```

  convert.base64-encode 就是一个过滤器,flag.php 就是要过滤的数据流.  
  转换过滤器 convert._  
  字符串过滤器 string._ 用于对字符串进行各类转换(加密,转换大小写等)

  **语法**

  - resource=<要过滤的数据流> 指定要筛选过滤的数据流
  - read=<读链的筛选列表> 设定一个或多个过滤器名称,以管道符|分隔
  - write=<写链的筛选列表> 设定一个或多个过滤器名称,以管道符|分隔
  - <;两个链的筛选列表> 任何没有以 read=或 write=作前缀的筛选器列表会视情况应用于读或写链

- php://fd 允许直接访问指定的文件描述符.例如 php://fd/3 引用了文件描述符 3
- php://memory 和 php://temp 这是一个类似文件包装器的数据流,允许读写临时数据.m 总是把数据储存在内存中,而 t 会在内存量达到预定义的限制后(默认 2MB)存入临时文件中.临时文件位置的决定和 sys_get_temp_dir()的方式一致

##### file:// 访问本地文件系统

```php
http://127.0.0.1/cmd.php?file=file://D:/soft/phpStudy/WWW/phpcode.txt
```
