---
title: js-WebApis
typora-root-url: js-WebApis
date: 2023-02-28 08:59:45
tags:
---

> DOM：文档对象模型
>
> BOM：浏览器对象模型

## DOM

DOM (Document Object ModeI 一一文档对象模型 ) 是用来呈现以及与任意 HTML 或 XML 文档交互的 API

即浏览器提供的一套专门用来操作网页内容的功能

### 作用

开发网页内容特效和实现用户交互

### DOM 树

将 HTML 文档以树状结构直观的表现出来，我们称之为文档树或 DOM 树
直观的体现了标签与标签之间的关系

![web-api](./web-api.jpg)

### DOM 节点

DOM 树里每一个内容都称之为节点

#### 节点类型

- 元素节点

  所有的标签，body,div

- 属性节点

  所有的属性，比如 href

- 文本节点

### DOM 对象

浏览器根据 html 标签生成的 JS 对象，所有的标签属性都可以在这个对象上面找到修改这个对象的属性会自动映射到标签身上

- document 对象

  是 DOM 里提供的一个对象，它提供的属性和方法都是用来访问和操作网页内容的

  网页所有内容都在 document 里面

### 获取 DOM 对象

- 根据 CSS 选择器来获取 DOM 元素

  - 选择匹配的第一个元素

    ```js
    document.querySelector('css选择器');
    ```

    - 参数：包含一个或多个有效的 CSS 选择器 字符串

    - 返回值：CSS 选择器匹配到的第一个元素，一个 HTMLElement 对象

      如果没有匹配到，返回 null

  - 选择匹配的多个元素

    ```js
    document.querySelectorAll('css选择器');
    ```

    - 参数:包含一个或多个有效的 CSS 选择器 字符串

    - 返回值：CSS 选择器匹配的 NodeList 对象集合（伪数组）

      > 即使只有一个元素，返回的也是一个只包含一个元素的集合

- 父节点查找

  - parentNode 属性：返回最近一级的父节点，找不到返回 null

    ```js
    子元素.parentNode;
    ```

- 子节点查找

  - childNodes：获得所有子节点、包括文本节点（空格、换行）、注释节点等
  - children ： 仅获得所有元素节点（返回的是伪数组）

- 兄弟关系查找

  - nextElementSibling：下一个兄弟节点
  - previousElemetSibling：上一个兄弟节点

- 其他获取 DOM 元素的方法（了解）

  ```js
  // 根据id获取一个元素
  document.getElementById('nav');
  // 根据标签获取一类元素
  document.getElementByTagName('div');
  // 根据类名获取元素
  document.getElementByClassName('w');
  ```

### 操作元素内容

- 元素 innerText 属性

  将文本内容添加/更新到任意标签位置

  显示纯文本，不解析标签

- 元素.innerHTML 属性

  将文本内容添加/更新到任意标签位置

  会解析标签，多标签建议使用模板字符

- 其他属性：href, title, src

### 操作元素样式属性

- 通过 style 属性操作 CSS

  ```js
  obj.style.样式属性 = 值;
  ```

- 操作类名（className）操作 css

  如果修改的样式比较多，直接通过 style 属性修改比较繁琐，可以借助于 css 类名的形式

  ```js
  // active是一个类名
  元素.className = 'active';
  ```

  > className 是使用新值换旧值, 如果需要添加一个类,需要保留之前的类名

- 通过 classList 操作类控制 css

  为了解决 className 容易覆盖以前的类名，我们可以通过 classList 方式追加和删除类名

  - 追加一个类

    ```js
    元素.classList.add('类名');
    ```

  - 删除一个类

    ```js
    元素.classList.remove('类名');
    ```

  - 切换一个类

    ```js
    元素.classList.toggle('类名');
    ```

  > 修改大量的样式更方便
  >
  > classList 是追加和删除不影响以前类名

### 操作表单元素 属性

```js
DOM对象.value = 'username';
DOM对象.type = 'password';
```

表单属性中有一些添加了就有效果，移除就没有效果，一律使用布尔值表示 如果为 true 代表添加了该属性 如果是 false 代表移除了该属性。`disabled`，`checked`，`selected`

### 自定义属性

- 标准属性：标签天生自带的属性 比如`class` `id` `title`等, 可以直接使用点语法操作比如： `disabled`、`checked`、`selected`

- 自定义属性：

  - 在 html5 中推出来了专门的 data-自定义属性
  - 在标签上一律以 data-开头
  - 在 DOM 对象上一律以 dataset 对象方式获取

  ```html
  <body>
    <div class="box" data-id="10">text text</div>
    <script>
      const box = document.querySelector('.box');
      console.log(box.dataset.id);
    </script>
  </body>
  ```

### 增加节点

即创造出一个新的网页元素，再添加到网页内，一般先创建节点，然后插入节点

1. 创建节点

   ```js
   document.createElement('标签名');
   ```

2. 追加节点

   ```js
   父元素.appendChild(newElem);
   父元素.insertBefore(newElem, baseElem); //插入到父元素中某个子元素的前面
   ```

### 克隆节点

cloneNode 会克隆出一个跟原标签一样的元素，括号内传入布尔值

- 若为 true，则代表克隆时会包含后代节点一起克隆
- 若为 false，则代表克隆时不包含后代节点
- 默认为 false

```js
元素.clone(布尔值);
```

### 删除节点

```js
父元素.removeChild(要删除的元素);
```

> 如不存在父子关系则删除不成功

- elem.remove()

## 定时器

### 间歇函数

每隔一段时间调用这个函数

- 语法

  ```js
  let id = setInterval(回调函数, 间隔时间);
  clearInterval(id);
  ```

  间隔时间单位是 ms

> 函数名字注意不要加括号
>
> 定时器返回的是一个 id 数字

### 延时函数

setTimeout 仅仅执行一次，就是把一段代码延迟执行

- 语法
  ```js
  let timer = setTimeout(回调函数, 等待的毫秒数);
  // 清除延时函数
  clearTimeout(timer);
  ```

> - 延时器需要等待,所以后面的代码先执行
> - 每一次调用延时器都会产生一个新的延时器

## 事件监听

事件是在编程时系统内发生的动作或者发生的事情.

事件监听就是让程序检测是否有事件产生，一旦有事件触发，就立即调用一个函数做出响应，也称为 绑定事件或者注册事件

### 语法

```js
元素对象.addEventListener('事件类型', 回调函数);
```

事件监听三要素：

- 事件源：哪个 dom 元素被事件触发了，要获取 dom 元素
- 事件类型： 用什么方式触发，比如鼠标单击 click、鼠标经过 mouseover 等
- 事件调用的函数： 要做什么事

### 事件类型

#### 鼠标事件

- click：单击

- mouseenter：鼠标经过

  非冒泡事件

- mouseleave：鼠标离开

#### 焦点事件

- focus：获得焦点
- blur：失去焦点

#### 键盘事件

- keydown：键盘按下
- Keyup：键盘抬起

#### 文本事件

- input：用户输入事件

#### 页面加载事件

- load：加载外部资源（）完毕时触发的事件

  监听页面所有资源加载完毕：

  ```js
  window.addEventListener('load', function () {});
  ```

  > 注意：不光可以监听整个页面资源加载完毕，也可以针对某个资源绑定 load 事件

- DOMContentLoaded：当初始的 HTML 文档被完全加载和解析完成之后触发的事件，无需等待样式表/图像等完全加载

  给 document 添加 DOMContentLoaded 事件：

  ```js
  document.addEventListener('DOMContentLoaded', function () {});
  ```

#### 页面滚动事件

- scroll：
  - scrollLeft/scrollTop：获取被卷去的大小--》获取元素内容往左，往上滚出去看不见的距离
  - `document.documentElement.scrollTop`获取页面滚动的头部距离
  - scrollTo(x, y)：可以把内容滚动到指定的坐标

#### 页面尺寸事件

- resize：在窗口尺寸改变的时候触发事件

  检测屏幕宽度：

  ```js
  window.addEventListener('click', function () {
    let w = document.documentElement.clientWidth;
  });
  ```

#### 元素尺寸与位置

- clientWidth/ clientHeight : 获取元素的可见部分宽高（不包含 border，margin，滚动条）
- offsetWidth/offsetHeight : 获取元素的自身宽高（包含自身的宽高，padding，border）

  > 如果盒子是隐藏的，获取结果为 0

* offsetLeft/offsetTop :获取元素距离自己定位父级元素的左、上距离

#### M 端事件

- touchstart：手指触摸到一个 DOM 元素时触发
- touchmove: 手指在一个 DOM 元素上滑动时触发
- touchend: 手指从一个 DOM 元素上移开时触发

### 事件对象

任意事件类型被触发时与事件相关的信息会被以对象的形式记录下来，我们称这个对象为事件对象。

#### 获取

在事件绑定的回调函数的第一个参数就是事件对象，一般命名为 event、ev、e

```js
元素.addEventListener('click', function (e) {});
```

#### 常用属性

- type：获取当前事件类型
- clientX/clientY：获取光标相对于浏览器可见窗口左上角的位置
- offsetX/offsetY：获取光标相对于当前 DOM 元素左上角的位置
- key：用户按下的键盘键的值

### 环境对象

指的是函数内部特殊的变量 this ，它代表着当前函数运行时所处的环境

【谁调用， this 就是谁】 是判断 this 指向的粗略规则

直接调用函数，其实相当于是 window.函数，所以 this 指代 window

### 回调函数

如果将函数 A 做为参数传递给函数 B 时，我们称函数 A 为回调函数

即：当一个函数当做参数来传递给另外一个函数的时候，这个函数就是回调函数

## 事件流

![image-20230321162733545](./image-20230321162733545.png)

### 事件捕获

#### 概念

从 DOM 的根元素开始去执行对应的事件 (从外到里)

#### 使用方法

```js
DOM.addEventListener(事件类型, 事件处理函数, 是否使用捕获机制);
```

> - addEventListener 第三个参数传入 true 代表是捕获阶段触发（很少使用）
> - 若传入 false 代表冒泡阶段触发，默认就是 false
> - 若是用 L0 事件监听，则只有冒泡阶段，没有捕获

### 事件冒泡

当一个元素的事件被触发时，同样的事件将会在该元素的所有祖先元素中依次被触发。这一过程被称为事件冒泡

### 阻止冒泡

```js
事件对象.stopPropagation();
```

> 此方法可以阻断事件流动传播，在冒泡阶段和捕获阶段皆有效

### 阻止默认行为

我们某些情况下需要阻止默认行为的发生，比如 阻止 链接的跳转，表单域跳转

```js
e.preventDefault();
```

### 解绑事件

- on 事件方式，直接使用 null 覆盖就可以实现事件的解绑

  ```js
  btn.onclick = function () {
    alert('hello');
  };
  // 解绑
  btn.onclick = null;
  ```

- addEventListener 方式，必须使用 removeEventListener(事件类型, 事件处理函数, [获取捕获或冒泡阶段])

  ```js
  function fn() {
    alert('hello');
  }
  btn.addEventListener('click', fn);
  // 解绑
  btn.removeEventListener('click', fn);
  ```

### 事件委托

事件委托是利用事件流的特征解决一些开发需求的技巧

#### 原理

给父元素注册事件，当我们触发子元素的时候，会冒泡到父元素身上，触发父元素的事件

> ```js
> e.target.tagName; // 可以获取真正触发事件的元素
> ```

## 两种注册事件的区别

#### 传统 on 注册（L0）

- 同一个对象,后面注册的事件会覆盖前面注册(同一个事件)
- 直接使用 null 覆盖偶就可以实现事件的解绑
- 都是冒泡阶段执行的

#### 事件监听注册（L2）

- 语法: addEventListener(事件类型, 事件处理函数, 是否使用捕获)
- 后面注册的事件不会覆盖前面注册的事件(同一个事件)
- 可以通过第三个参数去确定是在冒泡或者捕获阶段执行
- 必须使用 removeEventListener(事件类型, 事件处理函数, 获取捕获或者冒泡阶段)
- 匿名函数无法被解绑

## 日期对象

### 实例化

```js
const date = new Date();
```

### 方法

| 方法                 | 作用           | 说明                                                         |
| -------------------- | -------------- | ------------------------------------------------------------ |
| getFullYear()        | 获得年份       | 获取四位年份                                                 |
| getMonth()           | 获取月份       | 0~11                                                         |
| getDate()            | 月份中的第几天 | 1~31                                                         |
| getDay()             | 一周的第几天   | 0~6，0 是星期日                                              |
| getHours             | 小时           | 0~23                                                         |
| getMinutes()         | 分钟           | 0~59                                                         |
| getSeconds()         | 秒             | 0~59                                                         |
| getTime()            | 时间戳         | 返回自 1970 年 1 月 1 日 00:00:00 (UTC) 到当前时间的毫秒数。 |
| Date.now()           | 时间戳         | 返回自 1970 年 1 月 1 日 00:00:00 (UTC) 到当前时间的毫秒数。 |
| toLocaleString()     |                | 2000/1/1 00:00:00                                            |
| toLocaleDateString() |                | 2000/1/1                                                     |



## BOM

BOM(Browser Object Model) 浏览器对象模型

![image-20230410013410631](./image-20230410013410631.png)

### window

window对象是一个全局对象，也可以说是JavaScript中的顶级对象

像document、alert()、console.log()这些都是window的属性，基本BOM的属性和方法都是window的。

所有通过var定义在全局作用域中的变量、函数都会变成window对象的属性和方法

window对象下的属性和方法调用的时候可以省略window

### location

location 对象拆分并保存了 URL 地址的各个组成部分

#### 常用属性和方法

+ href 属性获取完整的 URL 地址，对其赋值时用于地址的跳转
+ search 属性获取地址中携带的参数，符号 ？后面部分
+ hash 属性获取地址中的啥希值，符号 # 后面部分
+ reload 方法用来刷新当前页面，传入参数 true 时表示强制刷新

### navigator

navigator对象下记录了浏览器自身的相关信息

#### 常用属性和方法

+ userAgent 检测浏览器的版本及平台

  ~~~js
  // 检测 userAgent（浏览器信息）
          !(function () {
              const userAgent = navigator.userAgent
              // 验证是否为Android或iPhone
              const android = userAgent.match(/(Android);?[\s\/]+([\d.]+)?/)
              const iphone = userAgent.match(/(iPhone\sOS)\s([\d_]+)/)
              // 如果是Android或iPhone，则跳转至移动站点
              if (android || iphone) {
                  location.href = 'http://m.itcast.cn'
              }
          })()
  
  ~~~

### history

history对象主要管理历史记录， 该对象与浏览器地址栏的操作相对应，如前进、后退、历史记录等

#### 常用方法

+ back() 后退功能
+ forward() 前进功能
+ go(参数) 前进后退功能（参数如果是1前进，如果是-1后退一个页面）

### localStorage

可以将数据永久存储在本地(用户的电脑), 除非手动删除，否则关闭页面也会存在

#### 特性

+ 可以多窗口（页面）共享（同一浏览器可以共享）
+ 以键值对的形式存储使用

#### 方法

+ 存储数据：

  ~~~js
  localStorage.setItem(key, value);
  ~~~

+ 获取数据

  ~~~js
  localStorage.getItem(key);
  ~~~

+ 删除数据

  ~~~js
  localStorage.removeItem(key);
  ~~~

### sessionStorage

#### 特性

+ 生命周期为关闭浏览器窗口
+ 在同一个窗口(页面)下数据可以共享
+ 以键值对的形式存储使用
+ 用法跟localStorage 基本相同

## 重绘和回流

### 浏览器是如何进行界面渲染的

1. 解析（Parser）HTML，生成 DOM 树(DOM Tree)
2. 同时解析（Parser） CSS，生成样式规则 (Style Rules)
3. 根据 DOM 树和样式规则，生成渲染树(Render Tree)
4. 进行布局 Layout(回流/重排):根据生成的渲染树，得到节点的几何信息（位置，大小）
5. 进行绘制 Painting(重绘): 根据计算和获取的信息进行整个页面的绘制
6. Display: 展示在页面上

### 回流(重排)

当 Render Tree 中部分或者全部元素的尺寸、结构、布局等发生改变时，浏览器就会重新渲染部分或全部文档的过程称为 回流。

### 重绘

由于节点(元素)的样式的改变并不影响它在文档流中的位置和文档布局时(比如：color、background-color、outline 等), 称为重绘

> 重绘不一定引起回流，而回流一定会引起重绘。

### 会导致回流（重排）的操作

- 页面的首次刷新
- 浏览器的窗口大小发生改变
- 元素的大小或位置发生改变
- 改变字体的大小
- 内容的变化（如：input 框的输入，图片的大小）
- 激活 css 伪类 （如：:hover）
- 脚本操作 DOM（添加或者删除可见的 DOM 元素
