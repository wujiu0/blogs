---
title: 在WSL2-Ubuntu上安装mysql
date: 2022-05-04 04:06:59
typora-root-url: 在WSL2-Ubuntu上安装mysql
tags:
---

## 可能遇到的问题

- `ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock' `

  解决方案：使用 sudo 启动

- 发现可以不使用密码登录 root 用户
  这其实是 mysql 的一种验证机制， `auth_socket`，这里只会验证当前操作系统登陆的用户和数据库是否一致，不会检测密码
  只能用 UNIX 的 socket 方式登陆，这就保证了只能本地登陆，用户在使用这种登陆方式时已经通过了操作系统的安全验证

  解决方案：可以通过修改 mysql.user 表中的 plugin 字段为`caching_sha2_password`

- 修改密码
  ` alter user 'USERNAME'@'localhost' identified by 'YOUR_PASSWORD';`

## 系统版本

Ubuntu 20.04.4 LTS

## mysql 版本

8.0.29-0ubuntu0.20.04.2 (Ubuntu)

## 步骤

### 更新 APT 存储库中的包信息：

执行语句 `sudo apt update`

### 使用 APT 安装 MySQL：

执行语句 `sudo apt install mysql-server`

### 启动 MySQL 服务：

执行语句 `sudo service mysql start`

注意，此处有大坑：

1.  这里不能使用一般 linux 下的命令`sudo systemctl start`，会导致以下错误：

    ![](1.png)

具体原因解释可以查看 [此处](https://linuxhandbook.com/system-has-not-been-booted-with-systemd/)

2.  必须使用`sudo`，否则服务无法启动

    ![](2.png)

### 登录 MySQL

执行语句 `mysql -u root -p`

这就是问题最大的地方了，我们在安装的时候，并没有提示让我们设置 root 用户的密码，按理说这里密码填空直接就可以进入，但是却会出现`ERROR 1698 (28000): Access denied for user ‘root’@‘localhost’`

下面我们说说如何解决这个问题：

1. 执行命令 `sudo cat /etc/mysql/debian.cnf`，可以看到如下信息

   ![](3.png)

   其中 debian-sys-maint 账户是安装 mysql 时系统自动生成的 mysql 用户，对应的密码就是该用户的密码。

2. 登录账户 debian-sys-maint：`mysql -u debian-sys-maint -p`

   ![](4.png)

   成功登录

3. 修改 root 密码：

   `alter user 'root'@'localhost' identified by 'YOUR_PASSWORD';`

   `flush privileges;`

4. 接下来就可以成功登录了

   ![](5.png)

5. 若无法连接可以尝试加上`sudo`

   ![](6.png)

## 在 windows 本地连接 wsl 的数据库

wsl 和 windows 是共享端口的，也就是说可以主机直接通过 localhost:3306 来访问 wsl 的 mysql

直接尝试连接 `mysql -uroot -p` ，问题又来了

![](7.png)

解决办法：

再次使用 debian-sys-maint 登录，执行如下语句

`alter user 'root'@'localhost' identified with mysql_native_password by 'root';`

`flush privileges;`

再次尝试

![](8.png)

成功登录，同时我们也发现，在 wsl 中，可以在不使用`sudo`的情况下直接`mysql -uroot -p`登录

![9](../在WSL2上安装mysql/9.png)
