---
title: mybatis
date: 2022-04-05 10:48:16
tags: [后端，框架]
---

## 开发步骤

1. 导入坐标

   ```xml
   <!--mybatis坐标-->
   <dependency>
       <groupId>org.mybatis</groupId>
       <artifactId>mybatis</artifactId>
       <version>3.4.5</version>
   </dependency>
   <!--mysql驱动坐标-->
   <dependency>
       <groupId>mysql</groupId>
       <artifactId>mysql-connector-java</artifactId>
       <version>5.1.6</version>
       <scope>runtime</scope>
   </dependency>
   <!--日志坐标-->
   <dependency>
       <groupId>log4j</groupId>
       <artifactId>log4j</artifactId>
       <version>1.2.12</version>
   </dependency>
   ```

2. 创建表

3. 编写 javaBean

4. 编写 Mapper 映射文件

   ```xml
   <?xml  version="1.0" encoding="UTF-8" ?>
   <!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
   <mapper namespace="userMapper">
       <select id="selectAll"  resultType="com.example.domain.User">
           select * from User
       </select>
   </mapper>
   ```

5. 编写 Mybatis 核心配置文件

   ```xml
   <!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN“ "http://mybatis.org/dtd/mybatis-3-config.dtd">
   <configuration>
       <environments default="development">
           <environment id ="development">
                   <transactionManager type="JDBC"/>
                   <dataSource type="POOLED">
                   <property name="driver" value="com.mysql.jdbc.Driver"/>
                   <property name="url" value="jdbc:mysql:///test"/>
                   <property name="username" value="root"/>
                   <property name="password" value="root"/>
                   </dataSource>
               </environment>
           </environments>
       <mappers>
           <!--加载sql映射文件-->
           <mapper resource="com\example\mapper\userMapper.xml"/>
       </mappers>
   </configuration>
   ```

6. 编写测试代码

   ```java
   //加载核心配置文件
   InputStream resourceAsStream = Resources.getResourceAsStream("mybatis-config.xml");
   //获得sqlSession工厂对象
   SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
   //获得sqlSession对象
   SqlSession sqlSession = sqlSessionFactory.openSession();
   //执行sql语句
   List<User>  userList = sqlSession.selectList("userMapper.selectAll");
   System.out.println(userList);
   //释放资源
   sqlSession.close();
   ```

## Mapper 代理开发

采用 Mybatis 的代理开发方式实现 DAO 层的开发，这种方式是我们后面进入企业的主流。
Mapper 接口开发方法只需要程序员编写 Mapper 接口（相当于 Dao 接口），由 Mybatis 框架根据接口定义创建接
口的动态代理对象，代理对象的方法体同上边 Dao 接口实现类方法

### 规范

- 定义与 SQL 映射文件同名的 Mapper 接口，并且将 Mapper 接口和 SQL 映射文件放置在同一目录下
- 设置 Mapper.xml 文件中的 namespace 为 mapper 接口的全限定名
- 在 Mapper 接口中定义方法，方法名就是 SQL 映射文件中 sql 语句的 id，并保持参数类型和返回值类型一致

### 使用步骤

1. 编写 Mapper 接口

   ```java
   public interface UserMapper {
       List<User> selectAll();
   }
   ```

2. 编写 Mapper.xml

   ```xml
   <mapper namespace="com.example.mapper.UserMapper">
       <select id="selectAll" resultType="user">
           SELECT * FROM user;
       </select>
   </mapper>
   ```

3. 测试

   ```java
   @Test
   public void test() {
       InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
       SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
       SqlSession sqlSession = sqlSessionFactory.openSession();

   	// 获取Mapper对象
       UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
       // 使用Mapper调用对应的方法
       List<User> users = userMapper.selectAll();
       System.out.println(users);

       sqlSession.close();
   }
   ```

## 相应 API

### SqlSession 工厂构建器 SqlSessionFactoryBuilder

常用 API：SqlSessionFactory build(InputStream inputStream)
通过加载 mybatis 的核心文件的输入流的形式构建一个 SqlSessionFactory 对象

```java
String resource = "org/mybatis/builder/mybatis-config.xml";
InputStream inputStream = Resources.getResourceAsStream(resource);
SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
SqlSessionFactory factory = builder.build(inputStream);
```

其中， Resources 工具类，这个类在 org.apache.ibatis.io 包中。Resources 类帮助你从类路径下、文件系统或
一个 web URL 中加载资源文件。

### SqlSession 工厂对象 SqlSessionFactory

SqlSessionFactory 有多个个方法创建 SqlSession 实例。常用的有如下两个：

- openSession()

  会默认开启一个事务，但事务不会自动提交 ，也就意味着需要手动提交该事务，更新操作数据才会持久化到数据库中

- openSession(boolean autoCommit)

  参数为是否自动提交，如果设置为 true，那么不需要手动提交事务

### SqlSession 会话对象

SqlSession 实例在 MyBatis 中是非常强大的一个类。在这里你会看到所有执行语句、提交或回滚事务和获取映射器实例的方法。
执行语句的方法主要有：

- `<T> T selectOne(String statement, Object parameter)`
- `<E> List<E> selectList(String statement, Object parameter)`
- `int insert(String statement, Object parameter)`
- `int update(String statement, Object parameter)`
- `int delete(String statement, Object parameter)`

操作事务的方法：

- `void commit()`
- `void rollback()`

## 核心配置文件

- configuration 配置（按照层级关系）

  - properties 属性

    实际开发中，习惯将数据源的配置信息单独抽取成一个`properties`文件，该标签可以加载额外配置的`properties`文件

  - setting 设置

  - typeAliases 类型别名

    为 java 类型设置一个短的名字，将全限定名定义别名为短限定名

  - typeHandlers 类型处理器

  - objectFactory 对象工厂

  - plugins 插件

  - environments 环境

    - environment
      - transactionManager 事务管理器
        1. JDBC：这个配置就是直接使用了 JDBC 的提交和回滚设置，它依赖于从数据源得到的连接来管理事务作用域。
        2. MANAGED：这个配置几乎没做什么。它从来不提交或回滚一个连接，而是让容器来管理事务的整个生命周期（比如 JEE
           应用服务器的上下文）。 默认情况下它会关闭连接，然而一些容器并不希望这样，因此需要将 closeConnection 属性设置
           为 false 来阻止它默认的关闭行为。
      - dataSource 数据源
        1. UNPOOLED：这个数据源的实现只是每次被请求时打开和关闭连接。
        2. POOLED：这种数据源的实现利用“池”的概念将 JDBC 连接对象组织起来。
        3. JNDI：这个数据源的实现是为了能在如 EJB 或应用服务器这类容器中使用，容器可以集中或在外部配置数据源，然后放置
           一个 JNDI 上下文的引用。

  - databaseIdProvider 数据库厂商标识

  - mappers 映射器

    该标签的作用是加载映射的，加载方式有如下几种：
    • 使用相对于类路径的资源引用，例如：`<mapper resource="org/mybatis/builder/AuthorMapper.xml"/>`
    • 使用完全限定资源定位符（URL），例如：`<mapper url="file:///var/mappers/AuthorMapper.xml"/>`
    • 使用映射器接口实现类的完全限定类名，例如：`<mapper class="org.mybatis.builder.AuthorMapper"/>`
    • 将包内的映射器接口实现全部注册为映射器，例如：`<package name="org.mybatis.builder"/>`

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
  <configuration>
      <properties resource="jdbc.properties"/>
      <typeAliases>
          <!-- <typeAlias type="com.example.pojo.User" alias="user" /> -->
          <!-- 包扫描 -->
          <package name="com.example.pojo"/>
      </typeAliases>

      <environments default="development">
          <environment id="development">
              <transactionManager type="JDBC"/>
              <dataSource type="POOLED">
                  <property name="driver" value="${jdbc.driver}"/>
                  <property name="url" value="${jdbc.url}"/>
                  <property name="username" value="${jdbc.username}"/>
                  <property name="password" value="${jdbc.password}"/>
              </dataSource>
          </environment>
      </environments>
      <mappers>
          <package name="com.example.mapper"/>
      </mappers>
  </configuration>
  ```

## 映射文件

### 基本操作

- `<select>`

- `<insert>`：插入

  返回添加数据的主键

  ​ `<insert useGeneratedKeys="true" keyProperty="id">`

- `<update>`：修改

- `<delete>`：删除

### 动态 SQL

#### `<if>`：条件判断

- test：条件表达式
- 当条件为空时，SQL 语句构造错误，可以选择`where 1 = 1`来解决，mybatis 提供了`<where>`来解决
- 单条件动态查询：从多个条件中选择一个
- choose(when, otherwise) 类似于 java 中的 switch 语句
- when：条件表达式
- otherwise：条件不成立时的表达式

我们根据实体类的不同取值，使用不同的 SQL 语句来进行查询。比如在 id 如果不为空时可以根据 id 查询，如果
username 不同空时还要加入用户名作为条件。

```xml
<select id="findByCondition" parameterType="user" resultType="user">
    select * from User
    <where>
        <if test="id!=0">
            and id=#{id}
        </if>
        <if test="username!=null">
            and username=#{username}
        </if>
    </where>
</select>
```

#### `<foreach>`：用于遍历集合

- collection：代表要遍历的集合元素，注意编写时不要写#{}
- open：代表语句的开始部分
- close：代表结束部分
- item：代表遍历集合的每个元素，生成的变量名
- sperator：代表分隔符

```xml
<select id="selectByIds" resultType="com.example.pojo.User">
    select * from user
    <where>
        <foreach collection="list" open="id in(" close=")" item="id" separator=",">
            #{id}
        </foreach>
    </where>
</select>
```

### SQL 片段抽取

Sql 中可将重复的 sql 提取出来，使用时用 include 引用即可，最终达到 sql 重用的目的

```xml
<!--抽取sql片段简化编写-->
<sql id="selectUser" select * from User</sql>

<select id="findById" parameterType="int" resultType="user">
    <include refid="selectUser"/> where id=#{id}
</select>

<select id="findByIds" parameterType="list" resultType="user">
    <include refid="selectUser"/>
    <where>
        <foreach collection="array" open="id in(" close=")" item="id" separator=",">
            #{id}
        </foreach>
    </where>
</select>
```

### 自定义结果集

`<resultMap>`：

- id：唯一标识
- type：映射的类型，支持别名

```xml
<resultMap id="userMap" type="user">
    <id column="uid" property="id"/>
    <result column="username" property="username"/>
    <result column="username" property="password"/>
    <collection property="orderList" ofType="order">
        <id property="id" column="id"/>
        <result property="orderTime" column="orderTime"/>
        <result property="total" column="total"/>
    </collection>
</resultMap>
```

作用：

- 完成多表操作
- 解决 数据库表的字段名称和实体类的属性名称不一致，不能自动封装数据的问题

## 参数封装

### 单个参数：

- pojo 类型：直接使用，属性名和参数占位符名称一致

- map 集合：直接使用，键名和参数站位福名称一致

- Collection：封装为 map 集合，可以使用@Param 注解，替换 Map 集合中默认的 arg 键名

  默认操作：

  ```java
  map.put("arg0", collection集合);
  map.put("collection", collection集合);
  ```

- List：封装为 map 集合

  默认操作：

  ```java
  map.put("arg0", list集合);
  map.put("collection", collection集合);
  map.put("list", list集合);
  ```

- Array：封装为 map 集合

  默认操作：

  ```java
  map.put("arg0", array数组);
  map.put("array", array数组);
  ```

- 其他类型：直接使用

### 多个参数：

封装为 map 集合，可以使用@Param 注解，替换 Map 集合中默认的 arg 键名

- 默认操作：

  ```java
  map.put("arg0", 参数值1);
  map.put("param1", 参数值1);
  map.put("arg1", 参数值2);
  map.put("param2", 参数值2);
  ```

- 若使用`@Param("username")`

  ```java
  map.put("username", 参数值1);
  map.put("param1", 参数值1);
  map.put("arg1", 参数值2);
  map.put("param2", 参数值2);
  ```

## 参数接收

参数占位符：

- `${}`：可能存在 sql 注入问题

- `#{}`：会将其替换为？，防止 sql 注入

使用时机：

- 参数传递的时候使用`#{}`

- 表名或者列名不固定的情况：`${}` （一般不用）

​ 参数类型：parameterType：可以省略

特殊字符处理：

- 转义字符
- `<![CDATA[]]>`

接收参数时注意：

- 散装参数：如果方法中有多个参数，需要使用@Param("sql 参数占位符名称")
- 实体类封装参数：对象的属性名称要和参数占位符名称一致
- map 集合：需要保证 sql 中的参数名和 map 集合的键的名称对应上

## 注解开发

。。个人认为还是使用 xml 配置吧
