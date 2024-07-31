---
title: File类的getPath()方法的一个问题
date: 2022-10-06 01:52:02
tags:
---

若创建的 File 对象是一个目录，那么它的 getPath()方法的返回值会默认去掉末尾的/，这点在路径拼接时可能会导致出错。

```java
public class File implements Serializable, Comparable<File> {

    public String toString() {
        return getPath();
    }

    public String getPath() {
        return path;
    }
}
```

若是要创建新的 File 文件对象的话，可以使用`public File(File parent, String child)`这个构造方法
