---
title: final关键字
date: 2021-10-08
tags: [java]
---

# final 关键字

### 概述

子类可以在父类的基础上改写父类内容，比如，方法重写。那么我们能不能随意的继承 API 中提供的类，改写其内容呢？显然这是不合适的。为了避免这种随意改写的情况，Java 提供了 final 关键字，用于修饰不可改变内容。

- final：不可改变。可以用于修饰类、方法和变量。
  - 类：被修饰的类，不能被继承。
  - 方法：被修饰的方法，不能被重写。
  - 变量：被修饰的变量，不能被重新赋值。

### 使用方式

1. 修饰类

   ```java
   final class 类名 {
   }
   ```

2. 修饰方法

   ```java
   修饰符 final 返回值类型 方法名(参数列表) {
       //方法体
   }
   ```

   重写被`final`修饰的方法，编译就会报错

3. 修饰变量

   > 对于基本类型来说，不可变说的是变量当中的数据不可改变
   >
   > 对于引用类型来说，不可变说的是变量当中的地址值不可改变

   - 局部变量--基本类型

     基本类型的局部变量，被`final`修饰后，只能赋值一次，不能再更改

     ```java
     public class Demo01Final {
         public static void main(String[] args) {
     	    final int num = 200;
             System.out.println(num);
             // num2 = 250;// 错误写法，不能重新赋值
         }
     }
     ```

   - 局部变量--引用类型

     引用类型的局部变量，被 final 修饰后，只能指向一个对象，地址不能再更改。但是不影响对象内部的成员变量值的修改，代码如下：

     ```java
     public class Demo2Final {
         public static void main(String[] args) {
         	// 创建User对象
         	final User u = new User();

        		// 创建另一个User对象
         	// u = new User();// 报错，指向了新的对象，地址值改变。
         	// 调用setName方法
         	u.setName("张三");// 可以修改
     	}
     }
     ```

   - 成员变量

     成员变量涉及到初始化的问题，初始化方式有两种，只能二选一

     - 显示初始化

     ```java
     public class User {
         final String USERNAME = "张三";
         private int age;
     }
     ```

     - 构造方法初始化

     ```java
     public class User {
         final String USERNAME;
         private int age;

         public User(String username,int age) {
             this.USERNAME = username;
             this.age = age;
         }
     }
     ```

> 不能使用一个 final 类作为父类
>
> 对于类和方法，abstract 关键字和 final 关键字不能同时使用
>
> 被 final 修饰的常量名称，一般都有书写规范，所有字母都大写。
