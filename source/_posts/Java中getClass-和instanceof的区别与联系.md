---
title: Java中getClass()和instanceof的区别与联系
date: 2021-10-30
tags: [java]
---

在比较两个类时，常见有两种做法，一种是`x.getClass() == y`; 一种是`x instanceof y`，通过下面代码来看一下二者有什么区别

> `getClass()`返回一个对象所属的类
>
> `instanceof`比较一个对象是否是该类的实例

```java
class Fu {

}

class Zi extends Fu {

}

public class Test {
    public static void main(String[] args) {
        Fu obj = new Zi();
        Zi zi = new Zi();
        Fu fu = new Fu();

        System.out.println(obj.getClass());                 // class Zi

        System.out.println("===================");
        System.out.println(obj instanceof Fu);              // true
        System.out.println(obj.getClass() == fu.getClass());// false
        System.out.println(obj instanceof Zi);              // true
        System.out.println(obj.getClass() == zi.getClass());// true

        System.out.println("===================");
        System.out.println(zi instanceof Fu);               // true
        System.out.println(zi.getClass() == fu.getClass()); // false
    }

}
```

可以看到，`getClass`返回的是一个类名，也就是说只会在类名相同时返回 true，不会判断子类与父类的继承关系。`instanceof`会判断继承关系，`子对象 instanceof 父类` 会返回 true，`父对象 instanceof 子类`会返回 false。

**即`instanceof`进行类型检查规则是：你属于该类吗？或者你属于该类的派生类吗？而通过`getClass()`获得类型信息采用`==`来进行检查是否相等的操作，是严格的判断，不会存在继承方面的考虑。**
