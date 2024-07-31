---
title: 在使用Java Scanner类进行输入时，换行符的问题
date: 2021-09-17 09:03:46
tags: [problem, java]
---

### 关于使用 Java Scanner 类进行输入时，换行符的问题

**问题：**在使用`Scanner.nextInt()`或`Scanner.next()`时，会读取到”\n”之前结束，这个”\n”会被下一个扫描器接收，如`Scanner.nextLine ()`，导致直接跳过此步；

**解决办法：**在下一步输入之前使用`Scanner.nextLine();`吸收多余的”\n”

```java
int num1 = sc.nextInt();
int num2 = sc.nextInt();//正确
System.out.println(num2);
```

```java
int num = sc.nextInt();
String str = sc.nextLine();//出错
System.out.println(str);
```

以上述代码为例，nextInt()输入 num 值，之后用户输入换行符想要结束，可是 nextInt()方法并不会读取换行符，因此换行符被读取放到了下一个 nextLine()中，nextLine()读取换行符，直接输入结束，因此 str 获得的值就是空`“”`

```java
int num = sc.nextInt();
String str = sc.next();//正确
System.out.println(str);
```

```java
String str1 = sc.next();
String str2 = sc.nextLine();//出错
System.out.println(str2);
```

```java
String str1 = sc.nextLine();
String str2 = sc.nextLine();//正确
System.out.println(str2);
```

**附：next()与 nextLine()的区别**

- next()方法在读取内容时，会过滤掉有效字符前面的无效字符，对输入有效字符之前遇到的空格键、Tab 键或 Enter 键等结束符，next()方法会自动将其过滤掉；只有在读取到有效字符之后，next()方法才将其后的空格键、Tab 键或 Enter 键等视为结束符；所以 next()方法不能得到带空格的字符串。
- `nextLine()`方法字面上有扫描一整行的意思，它的结束符只能是 Enter 键，即 nextLine()方法返回的是 Enter 键之前没有被读取的所有字符，它是可以得到带空格的字符串的。
