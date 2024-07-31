---
title: json
date: 2022-03-13 17:54:15
tags:
---

## 基础语法

定义

```json
var variable = {"key1":value1,
                "key2":value2,
                ……
				};
```

示例：

```json
var json = {"name":"zhangsan",
            "age":23,
            "addr":["北京","上海","西安"]
			};
```

## value 的数据类型：

- 数字（整数或浮点数）
- 字符串（在双引号中）
- bool 值（true/false）
- 数组（方括号中）
- 对象（大括号中）
- null

## 获取数据

格式：变量名.key

```json
json.name
```

## json 数据和 java 对象转换

- Fastjson 是阿里巴巴提供的一个 JAVA 语言编写的高性能功能完善的 json 库，是目前 java 语言中最快的 json 库，可以实现 java 对象和 json 字符串的相互转换

- 使用

  1. 导入 maven 坐标

     ```xml
     <dependency>
         <groupId>com.alibaba</groupId>
         <artifactId>fastjson</artifactId>
         <version>1.2.79</version>
     </dependency>
     ```

  2. java 对象转 json

     ```java
     String jsonStr = JSON.toJSONString(obj);
     ```

  3. json 字符串转 Java 对象

     ```java
     User user = JSON.parseObject(jsonStr, User.class);
     ```
