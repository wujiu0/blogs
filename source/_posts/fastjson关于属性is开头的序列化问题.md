---
title: fastjson关于属性is开头的序列化问题
date: 2022-09-20 15:15:59
tags:
---

## 问题描述

```java
public class Demo {
    private Boolean isHot;
    private Boolean isQuick;

    public Boolean getHot() {
        return isHot;
    }

    public void setHot(Boolean hot) {
        isHot = hot;
    }

    public Boolean getQuick() {
        return isQuick;
    }

    public void setQuick(Boolean quick) {
        isQuick = quick;
    }
}

```

如上面一个 bean，get/set 方法均为 idea 自动生成的，Fastjson 序列化后的结果为

```json
{
  "hot": true,
  "quick": true
}
```

我们其实期望的是

```json
{
  "isHot": true,
  "isQuick": true
}
```

## 解决方案

### 方案一

修改 get 方法为`getIsXXX`
`public Boolean getHot()`->`public Boolean getIsHot()`

### 方案二

不要以 is 开头，加入公司的代码规范，《Java 开发手册（泰山版）》中也提到了

【强制】POJO 类中的任何布尔类型的变量，都不要加 is 前缀，否则部分框架解析会引起序列 化错误。
