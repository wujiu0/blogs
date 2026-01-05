---
title: File 类
tags: []
categories: []
date: 2022-10-10 01:42:00
---

## 概述

`java.io.File` 类是文件和目录路径名的抽象表示，主要用于文件和目录的创建、查找和删除等操作。

## 构造方法

- File(String pathname) 通过将给定路径名字符串转换为抽象路径名来创建一个新 File 实例

  - 参数：
    `String pathname`：字符串中的路径名称
  - 路径可以是以文件结尾，也可以是以文件夹结尾
    路径可以是相对路径，也可以是绝对路径
  - 路径可以是存在，也可以是不存在
    创建 File 对象，只是把字符串路径封装为 File 对象，不考虑路径的真假情况

- `File(String parent, String child)` 根据 parent 路径名字符串和 child 路径名字符串创建一个新 File 实例

  - 参数：把路径分成了两部分
    `String parent`：父路径
    `String child`：子路径
  - 好处：
    父路径和子路径，可以单独书写，使用起来非常灵活；父路径和子路径都可以变化

- `File(File parent, String child)` 根据父类抽象路径名和 child 路径名字符串创建一个新 File 实例

  - 参数：把路径分成了两部分

    `String parent`：父路径

    `String child`：子路径

  - 好处：

    父路径和子路径，可以单独书写，使用起来非常灵活；父路径和子路径都可以变化

    父路径是 File 类型，可以使用 File 的方法对路径进行一些操作，再使用路径创建对象

## 常用方法

## 获取功能的方法

- `public String getAbsolutePath()` ：返回此 File 的绝对路径名字符串。

- `public String getPath()` ：将此 File 转换为路径名字符串。

- `public String getName()` ：返回由此 File 表示的文件或目录的名称。

- `public long length()` ：返回由此 File 表示的文件的长度。

  获取的是构造方法指定的文件的大小，以字节为单位

  注意：

  - 文件夹是没有大小的概念的，不能获取文件夹的大小
  - 如果构造方法中给出的路径不存在，那么 length()方法返回 0

## 判断功能的方法

- `public boolean exists()` : 此 File 表示的文件或目录是否实际存在
- `public boolean isDirectory()` : 此 File 表示的是否为目录
- `public boolean isFile()` : 此 File 表示的是否是文件

## 创建删除功能的方法

- `public boolean createNewFile()` ：当且仅当具有该名称的文件尚不存在时，创建一个新的空文件。

  返回值：

  - true：文件不存在，创建文件，返回 true
  - false：文件存在，不会创建，返回 false

  注意：

  - 此方法只能创建文件，不能创建文件夹

  - 创建文件的路径必须存在，否则会抛出异常

- public boolean delete() ：删除由此 File 表示的文件或目录。

  返回值：

  - true：文件/文件夹删除成功

  - false：文件夹中有内容，不会删除返回 false；路径不存在，返回 false

  注意：

  - delete()方法是直接在硬盘删除文件/文件夹，不走回收站

- `public boolean mkdir()` ：创建由此 File 表示的目录。

- `public boolean mkdirs()` ：创建由此 File 表示的目录，包括任何必需但不存在的父目录。

  返回值：

  - true：文件夹不存在，创建文件夹返回 true
  - false：文件夹存在，不会创建，返回 false

  注意：

  - 此方法只能创建文件夹，不能创建文件

## 遍历（文件夹）目录功能

- `public String[] list()` : 返回一个 String 数组，表示该 File 目录中的所有子文件或目录

- `public File[] listFiles()` : 返回一个 File 数组，表示该 File 目录中的所有子文件或目录

  注意：

  `list()`方法和`listFiles()`遍历的是构造方法中给出的目录

  如果构造方法中给出的目录路径不存在（或者不是一个目录），会抛出空指针异常

## 文件过滤器

`java.io.FileFilter` 是一个接口，是 File 的过滤器。 该接口的对象可以传递给 File 类的 `listFiles(FileFilter)`作为参数。接口中只有一个方法：

`boolean accept(File pathname)` ：测试 pathname 是否应该包含在当前 File 目录中，符合则返回 true。
