---
title: IO流
date: 2022-10-10 02:14:21
tags: 
---


# 字节输出流


`java.io.OutputStream` 

  此抽象类是表示输出字节流的所有类的超类，定义了一些子类共有的成员方法：

  `public void close()` : 关闭此输出流并释放与此流相关联的任何系统资源

  `public void flush()` : 刷新此输出流并强制任何缓冲的输出字节被写出

  `public void write(byte[] b)` : 将b.length字节从指定的字节数组写入此输出流

  `public void write(byte[] b, int off, int len)` : 从指定的字节数组写入 len字节，从偏移量 off开始输出到此输出流

  `public abstract void write(int b)` : 将指定的字节输出流

## 文件输出流

`java.io.FileOutputStream extends OutputStream`

  用于将数据写出到文件

### 构造方法：

+ `FileOutputStream(String name)`创建一个向具有指定名称的文件中写入数据的输出文件流。

+ `FileOutputStream(File file)` 创建一个向指定 File 对象表示的文件中写入数据的文件输出流。

  参数:写入数据的目的

  + `String name` : 目的地是一个文件的路径

  + `File file` : 目的地是一个文件

  作用:
  
  1. 创建一个`FileOutputStream`对象
  2. 会根据构造方法中传递的文件/文件路径,创建一个空的文件
  3. 会把`FileOutputStream`对象指向创建好的文件

### 写入数据的原理(内存-->硬盘)

  java程序-->JVM(java虚拟机)-->OS(操作系统)-->OS调用写数据的方法-->把数据写入到文件中

### 字节输出流的使用步骤(重点):

1. 创建一个`FileOutputStream`对象,构造方法中传递写入数据的目的地
2. 调用`FileOutputStream`对象中的方法write,把数据写入到文件中
3. 释放资源(流使用会占用一定的内存,使用完毕要把内存清空,提高程序的效率)
