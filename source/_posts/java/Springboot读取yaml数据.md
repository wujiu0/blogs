---
title: Springboot读取yaml数据
date: 2022-05-01 08:48:26
tags:
---

### 读取单一数据

1. 使用`@value`配合 SpEL 读取单个数据
2. 如果数据存在多层级，依次书写层级名称即可

```yaml
users:
  name: zhangsan
  age: 18
```

```java
@Value("${user.name}")
private String name;
@Value("${user.age}")
private int age;
```

### 读取全部属性数据

1.  使用`Environment`对象封装全部配置信息
2.  使用`@Autowired`自动装配数据到`Environment`对象中
3.  调用`getProperty()`获取数据

```java
@AutoWired
private Enviroment env;
```

### 自定义对象封装指定数据

1. 准备数据 `application.yaml`

   ```yaml
   datasource:
     driver: com.mysql.jdbc.Driver
     url: jdbc:mysql://localhost/springboot_db
     username: root
     password: root
   ```

2. 定义 Java Bean

   ```java
   // 定义数据类型封装yamnl文件中的数据
   // 定义为Spring管控的Bean
   @Component
   // 指定加载的数据
   @ConfigurationProperties(prefix = "datasource")
   public class MyDataSource{
       private String driver;
       private String url;
       private String username;
       private String password;

       // Getter/Setter...
   }
   ```
