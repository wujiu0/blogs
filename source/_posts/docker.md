---
title: docker
date: 2022-05-07 20:56:11
tags: []
---

## Docker 架构

![](1.png)

- 镜像(Image)

  Docker 镜像（Image），就相当于是一个 root 文件系统。比如官方镜像 ubuntu:16.04 就包含了完整的一套 Ubuntu16.04 最小系统的 root 文件系统。

- 容器（Container）：

  镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和对象一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

- 仓库（Repository）

  仓库可看成一个代码控制中心，用来保存镜像。

## Docker 命令

### 进程相关

- 启动 docker

  ```shell
  systemctl start docker
  ```

- 停止 docker

  ```shell
  systemctl stop docker
  ```

- 重启 docker

  ```shell
  systemctl restart docker
  ```

- 查看状态

  ```shell
  systemctl status docker
  ```

- 设置开机启动

  ```shell
  systemctl enable docker
  ```

### 镜像相关

- 查看镜像：查看本地所有镜像

  ```shell
  docker images
  docker images -q
  ```

- 搜索镜像：从网络中查找需要的镜像

  ```shell
  docker search 镜像名称
  ```

- 拉取镜像：从 Docker 仓库下载镜像到本地，镜像名称格式为名称:版本号，如果版本号不指定则是最新的版本。如果不知道镜像版本，可以去 docker hub 搜索对应镜像查看。

  ```shell
  docker pull 镜像名称
  ```

- 删除镜像：删除本地镜像

  ```shell
  docker rmi 镜像id  # 删除指定本地镜像
  docker rmi `docker images -q` # 删除所有本地镜像
  ```

### 容器相关

- 查看容器

  ```shell
  docker ps    # 查看正在运行的容器
  docker ps -a # 查看所有容器
  ```

- 创建并启动容器

  ```shell
  docker run 参数
  ```

  参数说明：

  - -i：保持容器运行。通常与-t 同时使用。加入 it 这两个参数后，容器创建后自动进入容器中，退出容器后，容器自动关闭。

  - -t：为容器重新分配一个伪输入终端，通常与-i 同时使用。

    -it 创建的容器一般称为交互式容器

  - -d：以守护（后台）模式运行容器。创建一个容器在后台运行，需要使用 docker exec 进入容器。退出后，容器不会关闭。

    -id 创建的容器一般称为守护式容器

  - --name：为创建的容器命名。

- 进入容器

  ```shell
  docker exec 容器名称   # 退出容器，容器不会关闭
  ```

- 停止容器

  ```shell
  docker stop 容器名称
  ```

- 启动容器

  ```shell
  docker start 容器名称
  ```

- 删除容器：如果容器是运行状态则删除失败，需要停止容器才能删除

  ```shell
  docker rm 容器名称
  ```

- 查看容器信息

  ```shell
  docker inspect 容器名称
  ```

## docker 容器的数据卷

![](2.png)

### 概念

- 数据卷是宿主机中的一个目录或文件
- 当容器目录和数据卷目录绑定后，对方的修改会立即同步
- 一个数据卷可以被多个容器同时挂载
- 一个容器也可以挂载多个数据卷

### 作用

- 容器数据持久化
- 外部机器和容器间接通信
- 容器之间数据交换

### 配置数据卷

- 创建启动容器时，使用-v 参数设置数据卷

  ```shell
  docker run ... –v 宿主机目录(文件):容器内目录(文件) ...
  ```

  注意：

  - 目录必须是绝对路径
  - 如果目录不存在，会自动创建
  - 可以挂载多个数据卷

### 数据卷容器

创建一个容器，挂载一个目录，让其他容器继承自该容器( --volume-from )。
通过简单方式实现数据卷配置

1. 创建启动 c3 数据卷容器，使用–v 参数设置数据卷

   ```shell
   docker run –it --name=c3 –v /volume centos:7 /bin/bash
   ```

2. 创建启动 c1 c2 容器，使用 `–-volumes-from` 参数设置数据卷

   ```shell
   docker run –it --name=c1 --volumes-from c3 centos:7 /bin/bash
   docker run –it --name=c2 --volumes-from c3 centos:7 /bin/bash
   ```

## 应用部署

### 部署 mysql

```shell
docker pull mysql:5
# 在/root目录下创建mysql目录用于存储mysql数据信息
mkdir ~/mysql
cd ~/mysql
docker run -id \
-p 3306:3306 \
--name=mysql_0 \
-v $PWD/conf:/etc/mysql/conf.d \
-v $PWD/logs:/logs \
-v $PWD/data:/var/lib/mysql \
-e MYSQL_ROOT_PASSWORD=root \
mysql:5
docker exec –it c_mysql /bin/bash
```

参数说明：

- `-p 3306:3306`：将容器的 3306 端口映射到宿主机的 3306 端口。
- `-v $PWD/conf:/etc/mysql/conf.d`：将主机当前目录下的 conf/my.cnf 挂载到容器的 /etc/mysql/my.cnf。配置目录
- `-v $PWD/logs:/logs`：将主机当前目录下的 logs 目录挂载到容器的 /logs。日志目录
- `-v $PWD/data:/var/lib/mysql` ：将主机当前目录下的 data 目录挂载到容器的 /var/lib/mysql 。数据目录
- `-e MYSQL_ROOT_PASSWORD=root`：初始化 root 用户的密码。

### 部署 tomcat

```shell
docker pull tomcat

# 在/root目录下创建tomcat目录用于存储tomcat数据信息
mkdir ~/tomcat
cd ~/tomcat
# 创建容器，设置端口映射、目录映射
docker run -id --name=tomcat_0 \
-p 8080:8080 \
-v $PWD:/usr/local/tomcat/webapps \
tomcat
```

参数说明：

- `-p 8080:8080`：将容器的 8080 端口映射到主机的 8080 端口
- `-v $PWD:/usr/local/tomcat/webapps`：将主机中当前目录挂载到容器的 webapps

### 部署 redis

```shell
docker pull redis:5.0
docker run -id --name=redis_0 -p 6379:6379 redis:5.0
```

### 部署 Nginx

1. 拉取镜像

   ```shell
   docker pull nginx
   ```

2. 相关配置

   ```shell
   # 在/root目录下创建nginx目录用于存储nginx数据信息
   mkdir ~/nginx
   cd ~/nginx
   mkdir conf
   cd conf
   # 在~/nginx/conf/下创建nginx.conf文件,粘贴下面内容
   ```

   ```conf
   user  nginx;
   worker_processes  1;

   error_log  /var/log/nginx/error.log warn;
   pid        /var/run/nginx.pid;


   events {
       worker_connections  1024;
   }


   http {
       include       /etc/nginx/mime.types;
       default_type  application/octet-stream;

       log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                         '$status $body_bytes_sent "$http_referer" '
                         '"$http_user_agent" "$http_x_forwarded_for"';

       access_log  /var/log/nginx/access.log  main;

       sendfile        on;
       #tcp_nopush     on;

       keepalive_timeout  65;

       #gzip  on;

       include /etc/nginx/conf.d/.conf;
   }
   ```

3. 创建容器，设置端口映射、目录映射

   ```shell
   docker run -id --name=c_nginx \
   -p 80:80 \
   -v $PWD/conf/nginx.conf:/etc/nginx/nginx.conf \
   -v $PWD/logs:/var/log/nginx \
   -v $PWD/html:/usr/share/nginx/html \
   nginx
   ```

   参数说明：

   - `-p 80:80`：将容器的 80 端口映射到宿主机的 80 端口。
   - `-v $PWD/conf/nginx.conf:/etc/nginx/nginx.conf`：将主机当前目录下的 /conf/nginx.conf 挂载到容器的 :/etc/nginx/nginx.conf。配置目录
   - `-v $PWD/logs:/var/log/nginx`：将主机当前目录下的 logs 目录挂载到容器的/var/log/nginx。日志目录

## docker 镜像

### 镜像原理

![](3.png)

Docker 镜像是由特殊的文件系统叠加而成

- 最底端是 bootfs，并使用宿主机的 bootfs

  > Linux 文件系统由 bootfs 和 rootfs 两部分组成
  >
  > - bootfs：包含 bootloader（引导加载程序）和 kernel（内核）
  > - rootfs：root 文件系统，包含的就是典型 Linux 系统中的/dev，/proc，/bin，/etc 等标准目录和文件
  > - 不同的 linux 发行版，bootfs 基本一样，而 rootfs 不同，如 ubuntu
  >   ，centos 等

- 第二层是 root 文件系统 rootfs,称为 base image

- 然后再往上可以叠加其他的镜像文件

- 统一文件系统（Union File System）技术能够将不同的层整合成一个文件系统，为这些层提供了一个统一的视角，这样就隐藏了多层的存在，在用户的角度看来，只存在一个文件系统。

- 一个镜像可以放在另一个镜像的上面。位于下面的镜像称为父镜像，最底部的镜像成为基础镜像。

- 当从一个镜像启动容器时，Docker 会在最顶层加载一个读写文件系统作为容器

### 镜像制作

1. 容器转为镜像

   ```shell
   docker commit 容器id 镜像名称:版本号
   ```

   ```shell
   docker save -o 压缩文件名称 镜像名称:版本号
   ```

   ```shell
   docker load -i 压缩文件名称
   ```

2. 通过 dockerfile

## DockerFile

### 概念

- dockerFile 是一个文本文件
- 包含了一条条的指令
- 每一条指令构建一层，基于基础镜像，最终构建出一个新的镜像
- 对于开发人员：可以为开发团队提供一个完全一致的开发环境
- 对于测试人员：可以直接拿开发时所构建的镜像或者通过 Dockerfile 文件构建一个新的镜像开始工作了
- 对于运维人员：在部署时，可以实现应用的无缝移植

### 关键字

| 关键字      |           作用           | 备注                                                                                                                          |
| :---------- | :----------------------: | :---------------------------------------------------------------------------------------------------------------------------- |
| FROM        |        指定父镜像        | 指定 dockerfile 基于哪个 image 构建                                                                                           |
| MAINTAINER  |         作者信息         | 用来标明这个 dockerfile 谁写的                                                                                                |
| LABEL       |           标签           | 用来标明 dockerfile 的标签 可以使用 Label 代替 Maintainer 最终都是在 docker image 基本信息中可以查看                          |
| RUN         |         执行命令         | 执行一段命令 默认是/bin/sh 格式: RUN command 或者 RUN ["command" , "param1","param2"]                                         |
| CMD         |       容器启动命令       | 提供启动容器时候的默认命令 和 ENTRYPOINT 配合使用.格式 CMD command param1 param2 或者 CMD ["command" , "param1","param2"]     |
| ENTRYPOINT  |           入口           | 一般在制作一些执行就关闭的容器中会使用                                                                                        |
| COPY        |         复制文件         | build 的时候复制文件到 image 中                                                                                               |
| ADD         |         添加文件         | build 的时候添加文件到 image 中 不仅仅局限于当前 build 上下文 可以来源于远程服务                                              |
| ENV         |         环境变量         | 指定 build 时候的环境变量 可以在启动的容器的时候 通过-e 覆盖 格式 ENV name=value                                              |
| ARG         |         构建参数         | 构建参数 只在构建的时候使用的参数 如果有 ENV 那么 ENV 的相同名字的值始终覆盖 arg 的参数                                       |
| VOLUME      | 定义外部可以挂载的数据卷 | 指定 build 的 image 那些目录可以启动的时候挂载到文件系统中 启动容器的时候使用 -v 绑定 格式 VOLUME ["目录"]                    |
| EXPOSE      |         暴露端口         | 定义容器运行的时候监听的端口 启动容器的使用-p 来绑定暴露端口 格式: EXPOSE 8080 或者 EXPOSE 8080/udp                           |
| WORKDIR     |         工作目录         | 指定容器内部的工作目录 如果没有创建则自动创建 如果指定/ 使用的是绝对地址 如果不是/开头那么是在上一条 workdir 的路径的相对路径 |
| USER        |       指定执行用户       | 指定 build 或者启动的时候 用户 在 RUN CMD ENTRYPONT 执行的时候的用户                                                          |
| HEALTHCHECK |         健康检查         | 指定监测当前容器的健康监测的命令 基本上没用 因为很多时候 应用本身有健康监测机制                                               |
| ONBUILD     |          触发器          | 当存在 ONBUILD 关键字的镜像作为基础镜像的时候 当执行 FROM 完成之后 会执行 ONBUILD 的命令 但是不影响当前镜像 用处也不怎么大    |
| STOPSIGNAL  |    发送信号量到宿主机    | 该 STOPSIGNAL 指令设置将发送到容器的系统调用信号以退出。                                                                      |
| SHELL       |   指定执行脚本的 shell   | 指定 RUN CMD ENTRYPOINT 执行命令的时候 使用的 shell                                                                           |

### 发布 springboot 项目

1. 定义父镜像：`FROM java:8`
2. 定义作者信息：`MAINTAINER wujiu <123@hello.com>`
3. 将 jar 包添加到容器：`ADD springboot.jar app.jar`
4. 定义容器启动的执行命令：`CMD java -jar app.jar`
5. 通过 dockerfile 构建镜像：`docker build -f dockerfile文件路径 -t 镜像名称:版本`
