---
title: REST风格
date: 2022-04-16 16:20:34
tags:
---

## 简介

REST(Representational State Transfer)，表现形式转换

- 传统风格资源描述形式

  `http://localhost/user/getById?id=1`

  `http://localhost/user/saveuser`

- REST 风格描述形式

  `http://localhost/user/1`

  `http://localhost/user`

## 优点

- 隐藏资源的访问行为，无法通过地址得知对资源是何种操作
- 书写简化

## 行为动作对应操作

| 查询 | GET    |
| ---- | ------ |
| 查询 | GET    |
| 添加 | POST   |
| 修改 | PUT    |
| 删除 | DELETE |

## 使用

例：

```java
@RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
@ResponseBody
public String delete(@PathVariable Integer id){
    System.out.println("user delete .." + id);
    return "{'moudle':user delete}";
}
```

@RequestMapping

- 类型：方法注解
- 位置：SpringMVC 控制器方法定义上方
- 作用：设置当前控制器方法请求访问路径
- 属性：
  - value(默认)：请求访问路径
  - method：http 请求动作，标准动作（GET/POST/PUT/DELETE）

@PathVariable

- 类型：形参注解

- 位置：SpringMVC 控制器方法形参定义前

- 作用：绑定路径参数与处理器方法形参间的关系，要求路径参数名与形参名一一对应
